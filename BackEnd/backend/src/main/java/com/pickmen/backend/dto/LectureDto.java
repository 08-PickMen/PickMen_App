package com.pickmen.backend.dto;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.model.UserLecture;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LectureDto {

	private Long id;
	private String name;
	
	public static LectureDto fromEntity(UserLecture userLecture) {
		return LectureDto.builder()
				.id(userLecture.getLecture().getId())
				.name(userLecture.getLecture().getName())
				.build();
	}
}
