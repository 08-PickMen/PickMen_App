package com.pickmen.backend.board.model;

import com.google.cloud.Role;
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

	private RoleType role;
	
	private String majorName;

	private String lectureName1;

	private String lectureName2;
	
	public static ReplyDto fromEntity(Reply reply) {
		return ReplyDto.builder()
				.id(reply.getId())
				.content(reply.getContent())
				.nickname(reply.getNickname())
				.createDateTime(reply.getCreateDateTime())
				.post_id(reply.getBoard().getId())
				.user_id(reply.getUser().getId())
				.role(reply.getUser().getRole())
				.majorName(reply.getUser().getMajor().getName())
				.lectureName1(reply.getUser().getUserLectures().get(0).getLecture().getName())
				.lectureName2(reply.getUser().getUserLectures().get(1).getLecture().getName())
				.build();
	}
}
