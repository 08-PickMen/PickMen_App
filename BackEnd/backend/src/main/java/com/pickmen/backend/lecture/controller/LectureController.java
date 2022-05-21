package com.pickmen.backend.lecture.controller;

import java.util.List;

import com.google.api.Http;
import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.lecture.model.Lecture;
import com.pickmen.backend.lecture.repository.LectureRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LectureController {

    @Autowired private LectureRepository lectureRepository;

    @GetMapping(value="Lecture/Get")
    public  List<Lecture> lectureGet() {
        try {
            return lectureRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    
    
}
