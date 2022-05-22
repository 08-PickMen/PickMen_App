package com.pickmen.backend.chat.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.pickmen.backend.dto.SchoolDto;
import com.pickmen.backend.user.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatDto {
	private long id;

	private String content;

	private LocalDateTime createDate;
	
	private MessageType messageType;

	private long chat_room_id;
	
	private long user_id;
}
