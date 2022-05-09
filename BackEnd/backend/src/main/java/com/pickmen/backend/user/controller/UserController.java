package com.pickmen.backend.user.controller;

import java.util.Random;

import javax.servlet.http.HttpSession;

import com.pickmen.backend.config.auth.PrincipalDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class UserController {


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
 


}
