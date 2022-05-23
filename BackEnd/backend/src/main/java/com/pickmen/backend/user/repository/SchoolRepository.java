package com.pickmen.backend.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickmen.backend.user.model.School;

public interface SchoolRepository extends JpaRepository<School, Long>{

}
