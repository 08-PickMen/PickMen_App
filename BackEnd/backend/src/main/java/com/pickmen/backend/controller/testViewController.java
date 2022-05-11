package com.pickmen.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
class testViewController {


    @GetMapping("/testview")
    public String getTest() {
        System.out.println("test3");
        return "testview";
    }

    @GetMapping("/authview")
    public String getAuth() {
        System.out.println("test4");
        return "authview";
    }


}
