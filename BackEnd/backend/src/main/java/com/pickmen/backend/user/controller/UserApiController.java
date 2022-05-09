package com.pickmen.backend.user.controller;

import javax.servlet.http.HttpSession;

import com.pickmen.backend.config.auth.PrincipalDetailsService;
import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.repository.UserRepository;
import com.pickmen.backend.user.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class UserApiController {

  @Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired private UserService userService;

  @Autowired private PrincipalDetailsService principalDetailsService;
  // 전통적인 로그인 방식 ( 사용 안함 )
  //  @Autowired private HttpSession session;

  @PostMapping("auth/loginProc")
  public String login(@RequestParam("username") String username, @RequestParam("password") String password)
  {
    try {
      UserDetails userDetails=principalDetailsService.loadUserByUsername(username);
      if(bCryptPasswordEncoder.matches(password, userDetails.getPassword()))
      return "로그인 성공";
      
      return "로그인 실패";
    }
     catch (Exception e) {
      e.printStackTrace();
      return "로그인 실패";
    }
  }


  @PostMapping("auth/joinProc")
  public @ResponseBody ResponseDto<User> join(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("email") String email)
   {
     User user=new User();
     user.setUsername(username);
     user.setPassword(password);
     user.setEmail(email);
     
    try {
      return new ResponseDto<>(HttpStatus.OK.value(), userService.join(user));
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }
  }

  // 전통적인 로그인 방식 ( 사용 안함 )
  //  @PostMapping("user/login")
  //  public @ResponseBody ResponseDto<Integer> userLogin(@RequestBody User user) {
  //    try {
  //      User principal = userService.login(user);
  //      session.setAttribute("principal", principal);
  //      return new ResponseDto<>(HttpStatus.OK.value(), 1);
  //    } catch (Exception e) {
  //      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
  //    }
  //  }

  @PutMapping("user")
  public @ResponseBody ResponseDto<Integer> user(@RequestBody User user, HttpSession session) {
    try {
      User savedUser = userService.updateUser(user);

      return new ResponseDto<>(HttpStatus.OK.value(), 1);
    } catch (Exception e) {
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), 1);
    }
  }
}
