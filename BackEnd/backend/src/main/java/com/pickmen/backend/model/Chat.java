package com.pickmen.backend.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "chat")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Chat {	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(length = 200)
	private String content;

	@CreationTimestamp
	private LocalDateTime createDate;
	

	@Enumerated(EnumType.STRING)
	private MessageType messageType;

	// Chat N : 1 ChatRoom -> 한개의 채팅방에는 채팅이 여러개 있을 수 있음
	@ManyToOne
	@JoinColumn(name = "chatRoom_id")
	private ChatRoom chatRoom;

	// Chat N : 1 User -> 한명의 사용자는 여러개의 채팅을 전송할 수 있음
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}
