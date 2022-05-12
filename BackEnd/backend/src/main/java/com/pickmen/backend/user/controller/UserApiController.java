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
import org.springframework.web.bind.annotation.PostMapping;
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


  @PostMapping("/signup/mentor")
  public @ResponseBody ResponseDto<User> signupMentor(@RequestParam("profile") MultipartFile[] uploadfile,@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("email") String email)
   {

     User user=new User();
     user.setUsername(username);
     user.setPassword(password);
     user.setProfileImage(imageService.upload(uploadfile));     
     user.setEmail(email);
     user.setRole(RoleType.MENTOR);
     
    try {
      return new ResponseDto<>(HttpStatus.OK.value(), userService.join(user));
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
  public @ResponseBody ResponseDto<User> signupMentee(@RequestParam("profile") MultipartFile[] uploadfile, @RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("email") String email)
   {
     User user=new User();
     user.setUsername(username);
     user.setPassword(password);
     user.setProfileImage(imageService.upload(uploadfile));  
     user.setEmail(email);
     user.setRole(RoleType.MENTEE);
     
    try {
      return new ResponseDto<>(HttpStatus.OK.value(), userService.join(user));
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }
  }

  @PostMapping("user/update")
  public @ResponseBody ResponseDto<Integer> user(@RequestParam("profile") MultipartFile[] uploadfile, User user, @AuthenticationPrincipal PrincipalDetail principalDetail) {
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
