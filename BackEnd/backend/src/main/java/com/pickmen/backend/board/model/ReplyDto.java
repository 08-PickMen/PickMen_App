package com.pickmen.backend.board.model;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.dto.MentorProfileDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ReplyDto {
	
	private long id;
	
	private String content;
	
	private String nickname;
	
	private String createDateTime;
	
	private Long post_id;
	
	private Long user_id;
	
	public static ReplyDto fromEntity(Reply reply) {
		return ReplyDto.builder()
				.id(reply.getId())
				.content(reply.getContent())
				.nickname(reply.getNickname())
				.createDateTime(reply.getCreateDateTime())
				.post_id(reply.getBoard().getId())
				.user_id(reply.getUser().getId())
				.build();
	}
}
