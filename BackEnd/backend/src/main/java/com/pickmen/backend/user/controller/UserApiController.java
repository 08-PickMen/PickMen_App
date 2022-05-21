package com.pickmen.backend.user.controller;

import java.util.List;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.config.auth.PrincipalDetailsService;
import com.pickmen.backend.dto.LectureDto;
import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.repository.UserRepository;
import com.pickmen.backend.user.service.ImageService;
import com.pickmen.backend.user.service.UserService;

import java.util.List;

import javax.websocket.server.PathParam;

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
import org.springframework.web.bind.annotation.PathVariable;
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

  @GetMapping("DuplicateCheck")
  public @ResponseBody ResponseDto<Integer> duplicateCheck(@RequestParam("nickname")String nickname) {
    try {
      System.out.println(userRepository.findByNickname(nickname).get().getNickname());
      if(userRepository.findByNickname(nickname)==null)
      return new ResponseDto<>(HttpStatus.OK.value(), null);
      else
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    } catch (Exception e) {
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }
  }

  @GetMapping("/user/myprofile")
  public @ResponseBody ResponseDto<User> myProfile(@AuthenticationPrincipal PrincipalDetail principalDetail) {
    try {
      return new ResponseDto<>(HttpStatus.OK.value(), userRepository.findByUsername(principalDetail.getUsername()).get());
    } catch (Exception e) {
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }
  }
  

  @PostMapping("/signup/mentor")
  public @ResponseBody ResponseDto<User> signupMentor(@RequestParam("profile") MultipartFile uploadfile,User user)
   {

     User newuser=new User();
     newuser.setUsername(user.getUsername());
     newuser.setPassword(user.getPassword());
     newuser.setNickname(user.getNickname());
     newuser.setAverageRating(3);
     newuser.setTeachSector(user.getTeachSector());
     newuser.setCreateDate(user.getCreateDate());
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

  @GetMapping("/getProfile")
  public ResponseEntity<Resource> getProfile(@RequestParam(value = "userid", required = false) long userid)
  {
    User user=userRepository.getById(userid);
    return imageService.display(user.getProfileImage());
  }

  @PostMapping("/signup/mentee")
  public @ResponseBody ResponseDto<User> signupMentee(@RequestParam(value = "profile", required = false) MultipartFile uploadfile, User user,
		  @RequestParam List<Long> lectureList)
   {
     User newuser=new User();
     newuser.setUsername(user.getUsername());
     newuser.setPassword(user.getPassword());
     newuser.setNickname(user.getNickname());
     newuser.setCreateDate(user.getCreateDate());
     newuser.setProfileImage(imageService.upload(uploadfile));  
     newuser.setEmail(user.getEmail());
     newuser.setRole(RoleType.MENTEE);
     
    try {
      return new ResponseDto<>(HttpStatus.OK.value(), userService.joinTest(newuser, lectureList));
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }
  }

  @PostMapping("user/update")
  public @ResponseBody ResponseDto<Integer> user(@RequestParam(value = "file", required = false) MultipartFile uploadfile, User user, @AuthenticationPrincipal PrincipalDetail principalDetail) {
    try {
      user.setId(principalDetail.getUserId());
      user.setProfileImage(imageService.upload(uploadfile));
      User savedUser = userService.updateUser(user);

      return new ResponseDto<>(HttpStatus.OK.value(), 1);
    } catch (Exception e) {
      return new ResponseDto<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), 1);
    }
  }
  
  // 유저의 관심 강의 리스트를 프론트로 반환하는 URL
  @GetMapping("/getLectureList")
	public @ResponseBody ResponseEntity<List<LectureDto>> getUserLectureList(@AuthenticationPrincipal PrincipalDetail principalDetail) {
		return new ResponseEntity<List<LectureDto>>(userService.getUserLectureList(principalDetail.getUserId()), HttpStatus.OK);
	}
  
  @GetMapping("/getLectureListTest/{user_id}")
	public @ResponseBody ResponseEntity<List<LectureDto>> getUserLectureList(@PathVariable long user_id) {
		return new ResponseEntity<List<LectureDto>>(userService.getUserLectureList(user_id), HttpStatus.OK);
	}
}


