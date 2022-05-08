package com.pickmen.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "chatRoom")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ChatRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column
	private long post_id;
	
	@Column
	private String roomName;

	// ChatRoom 1 : N Chat 
	@OneToMany(mappedBy = "chatRoom")
	private List<Chat> chat;
	
	// ChatRoom 1 : N User -> 한 개의 채팅방은 여러명의 유저를 가질 수 있음	
	@OneToMany( // FK가 아니다
			fetch = FetchType.EAGER)
	private List<User> userList;
	
}
