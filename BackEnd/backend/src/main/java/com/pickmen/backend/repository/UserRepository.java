package com.study.blog.repository;

import com.study.blog.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  // select * from user where username = ? and password ?
  Optional<User> findByUsernameAndPassword(String username, String password);

  Optional<User> findByUsername(String username);

  //  @Query(value = "select * from user where username = ? and password ?", nativeQuery = true)
  //  Optional<User> login(String username, String password);
}
