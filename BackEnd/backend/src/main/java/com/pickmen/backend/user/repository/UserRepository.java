package com.pickmen.backend.user.repository;

import java.util.Optional;

import com.pickmen.backend.user.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  // select * from user where username = ? and password ?
  Optional<User> findByUsernameAndPassword(String username, String password);

  Optional<User> findByPassword(String password);

  Optional<User> findByRoleOrderByAverageRating(String role);

  Optional<User> findByUsername(String username);

  //  @Query(value = "select * from user where username = ? and password ?", nativeQuery = true)
  //  Optional<User> login(String username, String password);
}
