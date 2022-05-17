package com.pickmen.backend.chat.model;

import lombok.Getter;

@Getter
public class UserChatRoomDto {
	
	private long id;	
	
	private long user_id;
		
	private long chatRoom_id;	
	
	public UserChatRoomDto(long id, long user_id, long chatRoom_id) {
		this.id = id;
		this.user_id = user_id;
		this.chatRoom_id = chatRoom_id;
	}
}
