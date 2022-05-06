package com.pickmen.backend.controller;

import java.io.IOException;

import com.pickmen.backend.ocr.ocrService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class testController {


    @Autowired
    private ocrService ocrService;


    @GetMapping("/auth/test")
    public String getHello() {
        System.out.println("test");
        return "Hello World";
    }

    @GetMapping("auth/test2")
    public String detectText() throws IOException{
        System.out.println("test2");
        ocrService.detectText();
        return "Detect Text";
    }


}
