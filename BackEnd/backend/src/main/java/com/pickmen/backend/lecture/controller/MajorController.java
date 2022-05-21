package com.pickmen.backend.lecture.controller;

import java.util.List;

import com.pickmen.backend.lecture.model.Major;
import com.pickmen.backend.lecture.repository.MajorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MajorController {

    @Autowired private MajorRepository majorRepository;

    @GetMapping(value="Major/Get")
    public  List<Major> majorGet() {
        try {
            return majorRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    
    
}
