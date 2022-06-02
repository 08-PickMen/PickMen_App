package com.pickmen.backend.user.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class UserLecture {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	// User와 N : N 관계지만 UserLecture을 두어 (User)1:N (UserLecture) N:1(Lecture)
	@JsonBackReference(value = "user-userLecture")
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@JsonBackReference(value = "lecture-userLecture")
	@ManyToOne
	@JoinColumn(name = "lecture_id")
	private Lecture lecture;
}
