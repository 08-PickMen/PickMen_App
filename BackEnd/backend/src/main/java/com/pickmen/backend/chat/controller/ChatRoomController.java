package com.pickmen.backend.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pickmen.backend.chat.model.Chat;
import com.pickmen.backend.chat.model.ChatDto;
import com.pickmen.backend.chat.model.ChatRoom;
import com.pickmen.backend.chat.model.UserChatRoom;
import com.pickmen.backend.chat.model.UserChatRoomDto;
import com.pickmen.backend.chat.service.ChatService;
import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.user.model.User;

@RestController
@RequestMapping("/chat")
public class ChatRoomController {
	@Autowired
	private ChatService chatService;

	// 모든 채팅방 목록 반환 - 테스트용
	// /chat/rooms/{user_id}
	@GetMapping("/rooms/{user_id}")
	public @ResponseBody ResponseEntity<List<UserChatRoomDto>> roomsTest(@PathVariable long user_id) {
		return new ResponseEntity<List<UserChatRoomDto>>(chatService.findAllRoom(user_id), HttpStatus.OK);

		// status를 확인할 수 있는 ResponseDto
		// return new ResponseDto<List<UserChatRoomDto>>(HttpStatus.OK.value(),
		// chatService.findAllRoom(user_id));
	}

	// 로그인 되어 있는 유저의 모든 채팅방 목록 반환
	// /chat/rooms
	@GetMapping("/rooms")
	public @ResponseBody ResponseEntity<List<UserChatRoomDto>> rooms(@AuthenticationPrincipal PrincipalDetail principalDetail) {
		return new ResponseEntity<List<UserChatRoomDto>>(chatService.findAllRoom(principalDetail.getUser().getId()), HttpStatus.OK);
	}

	// 채팅을 원하는 유저와 채팅방 생성 
	// /chat/room/createRoom/{user_id}
	@PostMapping("/room/createRoom/{user_id}")
	@ResponseBody
	ResponseEntity<UserChatRoomDto> createRoom(@PathVariable long user_id,
			@AuthenticationPrincipal PrincipalDetail principalDetail) {
		return new ResponseEntity<UserChatRoomDto>(chatService.createRoom(user_id, principalDetail.getUser()),
				HttpStatus.OK);
	}

	// 채팅을 원하는 유저와 채팅방 생성 - test 용(security 적용 X)
	// login 된 유저의 생성된 채팅방을 반환
	// /chat/room/createRoomTest/{user_id}
	@PostMapping("/room/createRoomTest/{user_id}")
	public @ResponseBody ResponseEntity<UserChatRoomDto> createRoom(@PathVariable long user_id,
			@RequestBody User user) {
		return new ResponseEntity<UserChatRoomDto>(chatService.createRoom(user_id, user), HttpStatus.OK);
	}

	// 선택한 채팅방 입장 시 해당 채팅방의 채팅 메세지들 불러오기
	@GetMapping("/room/enter/{room_id}")
	public @ResponseBody ResponseEntity<List<ChatDto>> getRoomChats(@PathVariable long room_id) {
		return new ResponseEntity<List<ChatDto>>(chatService.getRoomChats(room_id), HttpStatus.OK);
	}

	// 특정 채팅방 조회 (현재 사용 X)
	@GetMapping("/room/{room_id}")
	@ResponseBody
	public ChatRoom roomInfo(@PathVariable long room_id) {
		return chatService.findById(room_id);
	}

	// Slack Test 5/16 third test
}
