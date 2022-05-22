package com.pickmen.backend.lecture.repository;

import com.pickmen.backend.lecture.model.LectureTest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureTestRepository extends JpaRepository <LectureTest,Long>{
}
