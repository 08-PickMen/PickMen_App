package com.pickmen.backend.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pickmen.backend.model.Chat;
import com.pickmen.backend.model.ChatRoom;
import com.pickmen.backend.model.User;
import com.pickmen.backend.repository.ChatRepository;
import com.pickmen.backend.repository.ChatRoomRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChatService {

	@Autowired
	private ChatRoomRepository chatRoomRepository;
	
	@Autowired
	private ChatRepository chatRepository;
	
	// 채팅방 불러오기
	@Transactional(readOnly = true) 
	public List<ChatRoom> findAllRoom() {
		List<ChatRoom> listChatRoom = chatRoomRepository.findAll();
		// 채팅방 최근 생성 순으로 반환
		Collections.reverse(listChatRoom);
		
		return listChatRoom;
	}
	
	// 채팅방 생성
	/*
	@Transactional
	public ChatRoom createRoom(User loginUser, User receiveUser) {
		ChatRoom chatRoom = new ChatRoom();
		List<User> userList = new ArrayList<>();
		userList.add(loginUser);
		userList.add(receiveUser);	
		
		chatRoom.setUserList(userList);
		return chatRoom;
	}*/
	@Transactional
	public ChatRoom createRoom(String name) {
		ChatRoom chatRoom = new ChatRoom();
		chatRoom.setRoomName(name);
		chatRoomRepository.save(chatRoom);
		return chatRoom;
	}
	
	// 채팅방 하나 불러오기
	@Transactional
	public ChatRoom findById(long room_id) {
		return chatRoomRepository
				.findById(room_id)
				.orElseThrow(() -> new IllegalArgumentException("해당 채팅방은 존재하지 않습니다."));
	}
	
	// 채팅 저장
	@Transactional
	public Chat saveChat(Chat chat) {
		//Chat c = new Chat();
		/*c.setChatRoom_id(chat.getChatRoom_id());
		c.setContent(chat.getContent());
		c.setMessageType(chat.getMessageType());
		c.setCreateDate(chat.getCreateDate());
		c.setUser_id(chat.getUser_id());*/
		
		chatRepository.save(chat);
		return chat;
	}
}
