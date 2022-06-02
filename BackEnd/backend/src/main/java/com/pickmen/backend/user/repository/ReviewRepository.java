package com.pickmen.backend.user.repository;

import com.pickmen.backend.user.model.Review;
import com.pickmen.backend.user.model.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findAllByMentorId(long mentor_id);
	List<Review> findAllByMentor(User mentor);
}
