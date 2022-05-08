package com.pickmen.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.model.ChatRoom;
import com.pickmen.backend.model.User;
import com.pickmen.backend.service.ChatService;

@Controller
@RequestMapping("/chat")
public class ChatRoomController {
	@Autowired
	private ChatService chatService;
	
	// 채팅 리스트 화면
	@GetMapping("/room")
	public String rooms(Model model) {
		return "/chat/room";
	}
	
	// 모든 채팅방 목록 반환
	@GetMapping("/rooms")
	@ResponseBody
	public List<ChatRoom> room() {
		return chatService.findAllRoom();
	}
	
	// 채팅방 생성
	@PostMapping("/room")
	@ResponseBody
	public ChatRoom createRoom(@RequestParam String name) {
		return chatService.createRoom(name);		
	}
	
	// 채팅방 입장 화면
	@GetMapping("/room/enter/{room_id}")
	public String roomDetail(Model model, @PathVariable long room_id) {
		model.addAttribute("room_id", room_id);
		return "/chat/roomdetail";
	}
	
	// 특정 채팅방 조회
	@GetMapping("/room/{room_id}")
	@ResponseBody
	public ChatRoom roomInfo(@PathVariable long room_id) {
		return chatService.findById(room_id);
	}

}
