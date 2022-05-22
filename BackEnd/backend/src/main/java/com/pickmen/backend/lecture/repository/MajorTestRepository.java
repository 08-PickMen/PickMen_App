package com.pickmen.backend.lecture.repository;

import com.pickmen.backend.lecture.model.MajorTest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorTestRepository extends JpaRepository <MajorTest,Long>{
}
