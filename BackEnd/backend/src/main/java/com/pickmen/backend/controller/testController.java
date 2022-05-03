package com.pickmen.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class testController {

    @GetMapping("/auth/test")
    public String getHello() {
        System.out.println("test");
        return "Hello World";
    }
}
