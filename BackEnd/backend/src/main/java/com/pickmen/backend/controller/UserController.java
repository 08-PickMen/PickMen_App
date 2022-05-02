package com.study.blog.controller;

import java.util.Random;

import javax.servlet.http.HttpSession;

import com.study.blog.config.auth.PrincipalDetail;
import com.study.blog.email.SendMailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class UserController {

  @Autowired private SendMailService sendMailService;

  @GetMapping("auth/loginForm")
  public String loginForm() {
    return "auth/loginForm";
  }

  @GetMapping("auth/joinForm")
  public String joinForm() {
    return "auth/joinForm";
  }

  @GetMapping("user/updateForm")
  public String userUpdateForm(@AuthenticationPrincipal PrincipalDetail principalDetail) {
    return "user/updateForm";
  }
  
  @PostMapping("auth/sendemail")
    public @ResponseBody boolean emailSign(@RequestParam("email") String email,HttpSession session){
        int random = new Random().nextInt(1000000)+1000; // 1000 ~ 99999 인증번호 난수생성

        
        String certificate = String.valueOf(random);

        // 세션 저장 - 나중에 사용자가 작성한 인증번호와 같은지 확인하기 위한 용도
        session.setAttribute("Certificate", certificate);

        // 전송
        return sendMailService.sendEmail(email,"<PickMen>\n 회원가입 인증 코드 발급 안내 입니다.","귀하의 인증 코드는 "+certificate+" 입니다.");
    }


}
