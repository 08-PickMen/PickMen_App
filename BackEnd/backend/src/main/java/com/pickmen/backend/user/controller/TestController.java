package com.pickmen.backend.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/testview")
    public String testview(){
        return "testview";
    }
    
    
}
