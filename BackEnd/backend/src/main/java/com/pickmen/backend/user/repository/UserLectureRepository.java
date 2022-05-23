package com.pickmen.backend.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickmen.backend.user.model.UserLecture;

public interface UserLectureRepository extends JpaRepository<UserLecture, Long>{
	List<UserLecture> findAllByUserId(Long user_id);
}
