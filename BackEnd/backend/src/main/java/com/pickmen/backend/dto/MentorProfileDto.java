package com.pickmen.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.user.model.Lecture;
import com.pickmen.backend.user.model.Major;
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
public class MentorProfileDto {
	private long id;
	
	private RoleType role; // ENUM을 쓰는것이 좋다.
	
	private String nickname;
	
	private MajorDto majorDto;
	
	private LectureDto lectureDto1;
	
	private LectureDto lectureDto2;
	
	private String profileImage;
	
	private float averageRating;
	
	private boolean activeCanTeach;
	
	public static MentorProfileDto fromEntity(User user, Lecture lecture1, Lecture lecture2) {
		return MentorProfileDto.builder()
				.id(user.getId())
				.role(user.getRole())
				.nickname(user.getNickname())
				.majorDto(MajorDto.fromEntity(user.getMajor()))
				.lectureDto1(LectureDto.fromEntity(lecture1))
				.lectureDto2(LectureDto.fromEntity(lecture2))
				.profileImage(user.getProfileImage())
				.averageRating(user.getAverageRating())
				.activeCanTeach(user.isActiveCanTeach())
				.build();
	}

}
