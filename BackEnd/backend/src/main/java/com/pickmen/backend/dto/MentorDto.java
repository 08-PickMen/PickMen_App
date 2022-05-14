package com.pickmen.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.user.model.User;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
// User 에서 password가 제거된 Dto
public class MentorDto {

	private long id; // 시퀀스

	private String username; // 사용자 ID

	private String email; // 이메일

	private RoleType role; // ENUM을 쓰는것이 좋다.

	private LocalDateTime createDate; // 생성일

	// 새로 입력

	private String nickname;

	private String universityName;

	private String profileImage;

	// "멘토" 에만 추가되는 부분들
	private String reportCard;

	private String teachSector;

	private float averageRating;
	
	private boolean activeCanTeach;
	
	public MentorDto(User user) {
		this.id = user.getId();
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.role = user.getRole();
		this.createDate = user.getCreateDate();
		this.nickname = user.getNickname();
		this.universityName = user.getUniversityName();
		this.profileImage = user.getProfileImage();
		this.reportCard = user.getReportCard();
		this.teachSector = user.getTeachSector();
		this.averageRating = user.getAverageRating();
		this.activeCanTeach = true; // default
	}

	public MentorDto(List<User> mentorList) {
		// TODO Auto-generated constructor stub
	}
}
