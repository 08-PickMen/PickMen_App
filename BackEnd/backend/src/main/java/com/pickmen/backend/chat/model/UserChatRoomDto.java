package com.pickmen.backend.chat.model;

import lombok.Getter;

@Getter
public class UserChatRoomDto {
	
	private long user_id;
	
	private long other_id;
		
	private long chatRoom_id;
	
	private String other_id_nickname;
	
	private String other_id_major;
	
	private String lastChat;
	
	private String formatDateTime;

	private boolean isRated;

	public UserChatRoomDto( long user_id, long chatRoom_id) {
		this.user_id = user_id;
		this.chatRoom_id = chatRoom_id;
	}
	
	public UserChatRoomDto(long user_id, long other_id, long chatRoom_id, String other_id_nickname, String other_id_major, boolean isRated) {
		this.user_id = user_id;
		this.other_id = other_id;
		this.chatRoom_id = chatRoom_id;
		this.other_id_nickname = other_id_nickname;
		this.other_id_major = other_id_major;
		this.isRated = isRated;
	}
	
	public UserChatRoomDto(long user_id, long other_id, long chatRoom_id, String other_id_nickname, String other_id_major,
			String lastChat, String formatDateTime, boolean isRated) {
		this.user_id = user_id;
		this.other_id = other_id;
		this.chatRoom_id = chatRoom_id;
		this.other_id_nickname = other_id_nickname;
		this.other_id_major = other_id_major;
		this.lastChat = lastChat;
		this.formatDateTime = formatDateTime;
		this.isRated = isRated;
	}
}
