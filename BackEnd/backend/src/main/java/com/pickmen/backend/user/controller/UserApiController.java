package com.pickmen.backend.user.controller;

import javax.servlet.http.HttpSession;

import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class UserApiController {

  @Autowired private UserService userService;

  @Autowired private AuthenticationManager authenticationManager;
  // 전통적인 로그인 방식 ( 사용 안함 )
  //  @Autowired private HttpSession session;

  @PostMapping("auth/joinProc")
  public @ResponseBody ResponseDto<User> join(@RequestBody User user) {
    try {
      return new ResponseDto<>(HttpStatus.OK.value(), userService.join(user));
    } catch (Exception e) {
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
