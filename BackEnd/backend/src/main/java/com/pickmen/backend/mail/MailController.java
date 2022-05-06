package com.pickmen.backend.controller;

import java.util.Random;

import javax.servlet.http.HttpSession;

import com.pickmen.backend.service.SendMailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailController {
    @Autowired
    private SendMailService sendMailService;

    @PostMapping("/auth/send")
    public String sendMail(String email,HttpSession session){
        int random = new Random().nextInt(888889)+111111;
        String code=String.valueOf(random);

        //session.setAttribute("emailCode", code);
        
        try{
        sendMailService.sendEmail(email,"PickMen 본인인증 서비스입니다.", "인증번호: "+code);
        }
        catch(Exception e){
            return code;
        }
        return "0";
    }


    
}