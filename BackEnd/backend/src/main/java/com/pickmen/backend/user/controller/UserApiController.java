package com.pickmen.backend.user.controller;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.config.auth.PrincipalDetailsService;
import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.repository.UserRepository;
import com.pickmen.backend.user.service.ImageService;
import com.pickmen.backend.user.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class UserApiController {

  @Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired private UserService userService;

  @Autowired private PrincipalDetailsService principalDetailsService;

  @Autowired private UserRepository userRepository;

  @Autowired private ImageService imageService;

  @PostMapping("/login")
  public @ResponseBody ResponseDto<User> login(@RequestParam("username") String username, @RequestParam("password") String password)
  {
    try {
      UserDetails userDetails=principalDetailsService.loadUserByUsername(username);

 
      if(bCryptPasswordEncoder.matches(password, userDetails.getPassword())){
        Authentication authentication=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseDto<>(HttpStatus.OK.value(),userRepository.findByUsername(userDetails.getUsername()).get());
      }
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }
     catch (Exception e) {
      e.printStackTrace();
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }
  }

  @GetMapping("DuplicateCheck")
  public @ResponseBody ResponseDto<Integer> duplicateCheck(@RequestParam("nickname")String nickname) {
    try {
      if(userRepository.findByNickname(nickname)==null)
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
      else
      return new ResponseDto<>(HttpStatus.OK.value(), null);
    } catch (Exception e) {
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }
  }

  @PostMapping("/signup/mentor")
  public @ResponseBody ResponseDto<User> signupMentor(@RequestParam("profile") MultipartFile[] uploadfile,User user)
   {

     User newuser=new User();
     newuser.setUsername(user.getUsername());
     newuser.setPassword(user.getPassword());
     
     newuser.setNickname(user.getNickname());
     newuser.setProfileImage(imageService.upload(uploadfile));     
     newuser.setEmail(user.getEmail());
     newuser.setRole(RoleType.MENTOR);
     
    try {
      return new ResponseDto<>(HttpStatus.OK.value(), userService.join(newuser));
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }
  }

  @PostMapping("user/getProfile")
  public ResponseEntity<Resource> getProfile(long userid)
  {
    User user=userRepository.getById(userid);
    return imageService.display(user.getProfileImage());
  }

  @PostMapping("/signup/mentee")
  public @ResponseBody ResponseDto<User> signupMentee(@RequestParam(value = "profile", required = false) MultipartFile[] uploadfile, @RequestParam(value = "nickname", required = false) String nickname, @RequestParam(value = "email", required = false)  String email, @RequestParam(value = "password", required = false) String password, @RequestParam(value = "username", required = false) String username)
   {
     User newuser=new User();
     newuser.setUsername(username);
     newuser.setPassword(password);
     newuser.setNickname(nickname);
     newuser.setProfileImage(imageService.upload(uploadfile));  
     newuser.setEmail(email);
     newuser.setRole(RoleType.MENTEE);
     
    try {
      return new ResponseDto<>(HttpStatus.OK.value(), userService.join(newuser));
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }
  }

  @PostMapping("user/update")
  public @ResponseBody ResponseDto<Integer> user(@RequestParam(value = "profile", required = false) MultipartFile[] uploadfile, User user, @AuthenticationPrincipal PrincipalDetail principalDetail) {
    try {
      user.setId(principalDetail.getUserId());
      user.setProfileImage(imageService.upload(uploadfile));
      User savedUser = userService.updateUser(user);

      return new ResponseDto<>(HttpStatus.OK.value(), 1);
    } catch (Exception e) {
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), 1);
    }
  }
  
  
}


