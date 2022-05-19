package com.pickmen.backend.user.controller;

import java.security.Principal;
import java.util.List;

import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.repository.UserRepository;
import com.pickmen.backend.user.service.MentorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
// /user 로 들어오는 URL
//@RequestMapping("/user") 
public class MentorController {
	
	@Autowired
	private MentorService mentorService;


	@Autowired
	private UserRepository userRepository;
	
	// Mentor 개별 프로필 보여주기
	// /user/mentor/{id}
	@GetMapping("/mentor/{id}")
	public @ResponseBody ResponseEntity<User> mentorDetail(@PathVariable long id) {
		return new ResponseEntity<User>(mentorService.getMentor(id), HttpStatus.OK);
	}
	
	// Mentor 프로필 리스트 출력	
	// /user/mentors
	@GetMapping("/mentors")
	public @ResponseBody ResponseEntity<List<User>> mentorList() {
		return new ResponseEntity<List<User>>(mentorService.getMentorList(),HttpStatus.OK);
	}
	
	// Mentor 프로필 업데이트
	// /user/mentor/mentorUpdate
	@PutMapping("/mentor/{id}/mentorUpdate")
	public @ResponseBody ResponseEntity<User> mentorUpdate(@PathVariable long id, @RequestBody User user) {
		//User savedMentor = mentorService.updateMentor(id, mentorService.getMentor(id));
		//System.out.println(user);
		return new ResponseEntity<User>(mentorService.updateMentor(id, user), HttpStatus.OK);
	}

	@GetMapping("mentors/byTeachSector")
	public @ResponseBody ResponseEntity<List<User>> byTeachSector(String teachSector) {
		return new ResponseEntity<List<User>>(userRepository.MentorFindByTeachSector(teachSector), HttpStatus.OK); 
  }

}

