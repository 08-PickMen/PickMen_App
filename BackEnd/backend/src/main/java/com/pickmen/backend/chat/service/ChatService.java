package com.pickmen.backend.chat.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pickmen.backend.chat.model.Chat;
import com.pickmen.backend.chat.model.ChatDto;
import com.pickmen.backend.chat.model.ChatRoom;
import com.pickmen.backend.chat.model.MessageType;
import com.pickmen.backend.chat.model.UserChatRoom;
import com.pickmen.backend.chat.model.UserChatRoomDto;
import com.pickmen.backend.chat.repository.ChatRepository;
import com.pickmen.backend.chat.repository.ChatRoomRepository;
import com.pickmen.backend.chat.repository.UserChatRoomRepository;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChatService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ChatRoomRepository chatRoomRepository;

	@Autowired
	private ChatRepository chatRepository;

	@Autowired
	private UserChatRoomRepository userChatRoomRepository;

	// 로그인 되어 있는 유저의 채팅방 불러오기 - test 용
	@Transactional(readOnly = true)
	public List<UserChatRoomDto> findAllRoom(long user_id) {
		List<UserChatRoom> listUserChatRoom = userChatRoomRepository.findAllByUserId(user_id);
		// 채팅방 최근 생성 순으로 반환
		Collections.reverse(listUserChatRoom);

		List<UserChatRoomDto> listUserChatRoomDto = new ArrayList<>();
		int i;

		for (i = 0; i < listUserChatRoom.size(); i++) {
			listUserChatRoomDto.add(new UserChatRoomDto(listUserChatRoom.get(i).getId(),
					listUserChatRoom.get(i).getUser().getId(), listUserChatRoom.get(i).getChatRoom().getId()));
		}
		System.out.printf("First chatRoom_id: %d%n", listUserChatRoom.get(0).getChatRoom().getId());
		System.out.printf("Second chatRoom_id: %d%n", listUserChatRoom.get(1).getChatRoom().getId());

		return listUserChatRoomDto;
	}

	// 채팅방 생성
	@Transactional
	public UserChatRoomDto createRoom(long user_id, User user) {
		ChatRoom chatRoom = new ChatRoom();

		List<UserChatRoom> userChatRoomList = new ArrayList<>();

		// 채팅방 중복 체크 시작
		long i;
		UserChatRoom compareUserChatRoom1 = new UserChatRoom();
		UserChatRoom compareUserChatRoom2 = new UserChatRoom();

		// UserChatRoom DB를 돌면서
		for (i = 1; i < userChatRoomRepository.count(); i = i + 2) {
			compareUserChatRoom1 = userChatRoomRepository.findById(i);
			compareUserChatRoom2 = userChatRoomRepository.findById(i + 1);
			// 이미 존재하는 채팅방인지 중복 체크
			// 채팅방이 이미 존재하면 null을 return
			if ((compareUserChatRoom1.getUser().getId() == user.getId()
					&& compareUserChatRoom2.getUser().getId() == user_id)
					|| (compareUserChatRoom2.getUser().getId() == user.getId()
							&& compareUserChatRoom1.getUser().getId() == user_id)) {
				log.info("이미 존재하는 채팅방입니다!");
				return null;
			}
		}

		// 채팅방이 존재하지 않다면
		// 로그인 한 유저의 UserChatRoom 생성 후 DB에 저장
		UserChatRoom loginUserChatRoom = new UserChatRoom();
		loginUserChatRoom.setChatRoom(chatRoom);
		loginUserChatRoom.setUser(user);
		userChatRoomRepository.save(loginUserChatRoom);

		// 로그인 한 유저가 채팅을 원하는 상대방의 UserChatRoom 생성 후 DB에 저장
		UserChatRoom otherUserChatRoom = new UserChatRoom();
		otherUserChatRoom.setChatRoom(chatRoom);
		otherUserChatRoom.setUser(userRepository.findById(user_id)
				// findById가 Optional이라 Exception을 걸어줬지만 사실상 존재하지 않을 경우가 거의 없음
				.orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다.")));
		userChatRoomRepository.save(otherUserChatRoom);

		// UserChatRoom list에 추가
		userChatRoomList.add(loginUserChatRoom);
		userChatRoomList.add(otherUserChatRoom);

		// ChatRoom을 DB에 저장
		chatRoom.setUserChatRooms(userChatRoomList);
		chatRoomRepository.save(chatRoom);

		// 로그인 한 유저의 UserChatRoomDto 생성자 (id, user_id, chatroom_id) 만들고 반환
		UserChatRoomDto userChatRoomDto = new UserChatRoomDto(loginUserChatRoom.getId(),
				loginUserChatRoom.getUser().getId(), loginUserChatRoom.getChatRoom().getId());

		return userChatRoomDto;
	}

	// 채팅방 하나 불러오기
	@Transactional
	public ChatRoom findById(long room_id) {
		return chatRoomRepository.findById(room_id)
				.orElseThrow(() -> new IllegalArgumentException("해당 채팅방은 존재하지 않습니다."));
	}

	// 채팅 저장
	@Transactional
	public Chat saveChat(Chat chat) {
		// Chat c = new Chat();
		/*
		 * c.setChatRoom_id(chat.getChatRoom_id()); c.setContent(chat.getContent());
		 * c.setMessageType(chat.getMessageType());
		 * c.setCreateDate(chat.getCreateDate()); c.setUser_id(chat.getUser_id());
		 */

		chatRepository.save(chat);
		return chat;
	}

	@Transactional
		public Chat saveChatDto(ChatDto chatDto) {
			Chat chat = new Chat();
			
		    log.info(""+chatDto.getChat_room_id());
			log.info(""+chatDto.getUser_id());

			
		    chat.setContent(chatDto.getContent());
		    chat.setMessageType(MessageType.TALK);
		    chat.setChatRoom(chatRoomRepository.findById(chatDto.getChat_room_id()).orElseThrow(() -> new RuntimeException("예외1: ChatRoom Id 검색 안됨")));
		    chat.setUser(userRepository.findById(chatDto.getUser_id()).orElseThrow(() -> new RuntimeException("예외2: User Id 검색 안됨")));


			chatRepository.save(chat);
			return chat;
		}
	// 채팅방에 저장된 채팅들 불러오기
	@Transactional
	public List<ChatDto> getRoomChats(long room_id) {
		List<Chat> chats = new ArrayList<>();
		List<ChatDto> chatsDto = new ArrayList<>();
		Chat tempChat = new Chat();
		int i;
		
		ChatRoom chatRoom = chatRoomRepository.findById(room_id)
				.orElseThrow(() -> new IllegalArgumentException("해당 채팅방은 존재하지 않습니다."));

		chats = chatRepository.findAllByChatRoomId(chatRoom.getId());
		
		for(i = 0; i < chats.size(); i++) {
			tempChat = chats.get(i);
			chatsDto.add(new ChatDto(tempChat.getId(), tempChat.getContent(), tempChat.getCreateDate(), 
					tempChat.getMessageType(), tempChat.getChatRoom().getId(), tempChat.getUser().getId()));			
		}
		/*log.info("Chat id: {}", chatsDto.get(0).getId());
		log.info("Chat id: {}", chatsDto.get(1).getId());
		log.info("Chat id: {}", chatsDto.get(2).getId());
		log.info("Chat id: {}", chatsDto.get(3).getId());*/
		return chatsDto;
	}
}
