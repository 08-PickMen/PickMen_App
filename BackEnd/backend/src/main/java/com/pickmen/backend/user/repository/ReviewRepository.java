package com.pickmen.backend.user.repository;

import com.pickmen.backend.user.model.Review;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

  //  @Query(value = "select * from user where username = ? and password ?", nativeQuery = true)
  //  Optional<User> login(String username, String password);
}
