package com.pickmen.backend.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pickmen.backend.dto.MentorDto;
import com.pickmen.backend.dto.MentorProfileDto;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.service.MentorService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
// /user 로 들어오는 URL
//@RequestMapping("/user") 
public class MentorController {
	
	@Autowired
	private MentorService mentorService;
	
	// Mentor 개별 프로필 보여주기
	// /user/mentor/{id}
	@GetMapping("/mentor/{id}")
	public @ResponseBody ResponseEntity<User> mentorDetail(@PathVariable long id) {
		return new ResponseEntity<User>(mentorService.getMentor(id), HttpStatus.OK);
	}
	
	// Mentor 프로필 리스트 출력	
	// /user/mentors
	@GetMapping("/mentors")
	public @ResponseBody ResponseEntity<List<MentorProfileDto>> mentorList() {
		return new ResponseEntity<List<MentorProfileDto>>(mentorService.getMentorList(), HttpStatus.OK);
	}
	
	// Mentor 프로필 리스트 출력 (유저의 전공에 해당하는 분야의 멘토들의 리스트를 출력함 = 전공 기반 추천?)
	@GetMapping("/mentors/{major_id}")
	public @ResponseBody ResponseEntity<List<MentorProfileDto>> mentorListByMajor(@PathVariable long major_id) {
		log.info("mentors/{major_id} called");
		return new ResponseEntity<List<MentorProfileDto>>(mentorService.getMentorListByMajor(major_id), HttpStatus.OK);
	}
	
	// Mentor 프로필 업데이트
	// /user/mentor/mentorUpdate
	@PutMapping("/mentor/{id}/mentorUpdate")
	public @ResponseBody ResponseEntity<User> mentorUpdate(@PathVariable long id, @RequestBody User user) {
		//User savedMentor = mentorService.updateMentor(id, mentorService.getMentor(id));
		//System.out.println(user);
		return new ResponseEntity<User>(mentorService.updateMentor(id, user), HttpStatus.OK);
	}

}
