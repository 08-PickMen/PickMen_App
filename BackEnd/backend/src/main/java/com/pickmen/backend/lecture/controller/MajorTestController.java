package com.pickmen.backend.lecture.controller;

import java.util.List;

import com.pickmen.backend.lecture.model.MajorTest;
import com.pickmen.backend.lecture.repository.MajorTestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MajorTestController {

    @Autowired private MajorTestRepository majorRepository;

    @GetMapping(value="Major/Get")
    public  List<MajorTest> majorGet() {
        try {
            return majorRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    
    
}
