package com.pickmen.backend.dto;

import java.time.LocalDateTime;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.user.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MentorProfileDto {
	private long id;
	
	private RoleType role; // ENUM을 쓰는것이 좋다.
	
	private String nickname;
	
	private long major_id;
	
	private String profileImage;
	
	private String teachSector;
	
	private float averageRating;
	
	private boolean activeCanTeach;
	
	public static MentorProfileDto fromEntity(User user) {
		return MentorProfileDto.builder()
				.id(user.getId())
				.role(user.getRole())
				.nickname(user.getNickname())
				.major_id(user.getMajor().getId())
				.profileImage(user.getProfileImage())
				.teachSector(user.getTeachSector())
				.averageRating(user.getAverageRating())
				.activeCanTeach(user.isActiveCanTeach())
				.build();
	}

}
