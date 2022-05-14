package com.pickmen.backend.chat.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
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

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.pickmen.backend.user.model.User;

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
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
public class ChatRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column
	private long post_id;		
	
	@OneToMany(mappedBy = "chatRoom")
	   private List<UserChatRoom> userChatRooms = new ArrayList<>();

	
	// ChatRoom 1 : N Chat 
	@OneToMany(mappedBy = "chatRoom", fetch = FetchType.LAZY)
	private List<Chat> chat = new ArrayList<>();
	
	// ChatRoom 1 : N User -> 한 개의 채팅방은 여러명의 유저를 가질 수 있음	
	/*@OneToMany(mappedBy = "chatRoom")
	@JoinColumn(name = "chatRoom_id")
	private List<User> users;*/
	
}
