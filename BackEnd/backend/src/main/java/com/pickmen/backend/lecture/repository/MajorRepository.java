package com.pickmen.backend.lecture.repository;

import com.pickmen.backend.lecture.model.Major;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorRepository extends JpaRepository <Major,Long>{
}
