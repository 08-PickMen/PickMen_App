package com.pickmen.backend.user.repository;

import java.util.Optional;

import com.pickmen.backend.user.controller.model.Report;
import com.pickmen.backend.user.controller.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

  //  @Query(value = "select * from user where username = ? and password ?", nativeQuery = true)
  //  Optional<User> login(String username, String password);
}
