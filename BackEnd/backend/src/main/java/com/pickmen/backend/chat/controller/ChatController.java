package com.pickmen.backend.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pickmen.backend.chat.model.Chat;
import com.pickmen.backend.chat.model.ChatDto;
import com.pickmen.backend.chat.model.MessageType;
import com.pickmen.backend.chat.service.ChatService;
import com.pickmen.backend.config.auth.PrincipalDetail;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

	private final SimpMessageSendingOperations sendingOperations;
	
	private final ChatService chatService;
	
	// 클라이언트에서 "/pub/chat/message/enter" 로 입장 메시지를 보내는 요청 (setApplicationDestinationPrefixes("/pub") 이므로)
	@MessageMapping("/chat/message/enter")
	public void enter(@Payload Chat chat) {		
		if (MessageType.ENTER.equals(chat.getMessageType())){
			chat.setContent(chat.getUser() + "님이 입장하셨습니다.");
		}
		// "sub/chat/room/{room_id}" 를 구독하고 있는 클라이언트에게 입장 메시지를 전달		
		sendingOperations.convertAndSend("/sub/chat/room/"+ chat.getChatRoom().getId(), chat);
	}
	// 클라이언트에서 "/pub/chat/message" 로 메시지를 보내는 요청 (setApplicationDestinationPrefixes("/pub") 이므로)
	@MessageMapping("/chat/message")
	public void message(ChatDto chatDto) {
		//chat.setMessageType(MessageType.TALK);
		/*log.info("message_type: " + chat.getMessageType());
		log.info("chat_room_id: " + chat.getChatRoom().getId());
		log.info("content: " + chat.getContent());*/
		//log.info("id: " + chat.getUser().getId());
		log.info("chatRoom Id: " + chatDto.getChat_room_id());
		//ChatDto.fromEntity()
		// DB에 저장
		chatService.saveChatDto(chatDto);
		
		// "sub/chat/room/{room_id}" 를 구독하고 있는 클라이언트에게 메시지를 전달
		sendingOperations.convertAndSend("/sub/chat/room/"+ chatDto.getChat_room_id(), chatDto);
	}
}
