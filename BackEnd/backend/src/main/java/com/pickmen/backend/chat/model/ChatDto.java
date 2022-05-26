package com.pickmen.backend.chat.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.pickmen.backend.user.model.User;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class ChatDto {
	private long id;

	private String content;

	private LocalDateTime createDate;
	
	private MessageType messageType;

	private long chat_room_id;
	
	private long user_id;
	
	public ChatDto(long id, String content, LocalDateTime createDate, MessageType messageType, long chat_room_id, long user_id) {
		this.id = id;
		this.content = content;
		this.createDate = createDate;
		this.messageType = messageType;
		this.chat_room_id = chat_room_id;
		this.user_id = user_id;
	}
}
