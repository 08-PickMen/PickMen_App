package com.pickmen.backend.user.repository;

import java.util.List;
import java.util.Optional;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.dto.MentorDto;
import com.pickmen.backend.user.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  // select * from user where username = ? and password ?
  Optional<User> findByUsernameAndPassword(String username, String password);

  Optional<User> findByPassword(String password);
  
  Optional<User> findByUsername(String username);

  List<User> findAllByRole(RoleType role);

  Optional<User> findByNickname(String nickname);

  //  @Query(value = "select * from user where username = ? and password ?", nativeQuery = true)
  //  Optional<User> login(String username, String password);
}
