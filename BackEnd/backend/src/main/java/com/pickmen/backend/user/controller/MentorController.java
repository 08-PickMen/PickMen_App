package com.pickmen.backend.user.controller;

import java.security.Principal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.repository.UserRepository;
import com.pickmen.backend.user.service.ImageService;
import com.pickmen.backend.user.service.MentorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pickmen.backend.config.auth.PrincipalDetail;
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
	
	@Autowired 
	private ImageService imageService;


	@Autowired
	private UserRepository userRepository;
	
	// Mentor 개별 프로필 보여주기
	// /mentor/{id}
	@GetMapping("/mentor/{id}")
	public @ResponseBody ResponseEntity<User> mentorDetail(@PathVariable long id) {
		return new ResponseEntity<User>(mentorService.getMentor(id), HttpStatus.OK);
	}
	
	// Mentor 프로필 리스트 출력	
	// /mentors
	/*@GetMapping("/mentors")
	public @ResponseBody ResponseEntity<List<User>> mentorList(@AuthenticationPrincipal PrincipalDetail principalDetail) {
		List<User> mainuserlist=userRepository.MentorFindByTeachSector(principalDetail.getTeachSector());
		List<User> userlist=userRepository.MentorFindByNotTeachSector(principalDetail.getTeachSector());

		List<User> sumlist=Stream.concat(mainuserlist.stream(), userlist.stream())
                            .collect(Collectors.toList());
		
		return new ResponseEntity<List<User>>(sumlist,HttpStatus.OK);

	}*/
	@GetMapping("/mentorList")
	public @ResponseBody ResponseEntity<List<MentorProfileDto>> mentorList() {
		return new ResponseEntity<List<MentorProfileDto>>(mentorService.getMentorList(), HttpStatus.OK);
	}
	
	// Mentor 프로필 업데이트
	// /mentor/update
	@PutMapping("/mentor/update")
	public @ResponseBody ResponseEntity<User> mentorUpdate(@RequestParam(value = "file", required = false) MultipartFile uploadfile, 
			@RequestBody User user, 
			@AuthenticationPrincipal PrincipalDetail principalDetail,
			@RequestParam List<Long> lectureList) {
		//User savedMentor = mentorService.updateMentor(id, mentorService.getMentor(id));
		//System.out.println(user);
		User savedMentor = userRepository.findById(principalDetail.getUserId()).orElseThrow();
		savedMentor.setProfileImage(imageService.upload(uploadfile));
		return new ResponseEntity<User>(mentorService.updateMentor(savedMentor.getId(), user, lectureList), HttpStatus.OK);
	}
	
	// Mentor 프로필 업데이트
		// /mentor/update
		@PutMapping("/mentor/update/{id}")
		public @ResponseBody ResponseEntity<User> mentorUpdateTest(@PathVariable long id, @RequestBody User user,
				@RequestParam List<Long> lectureList) {
			//User savedMentor = mentorService.updateMentor(id, mentorService.getMentor(id));
			//System.out.println(user);
			return new ResponseEntity<User>(mentorService.updateMentor(id, user, lectureList), HttpStatus.OK);
		}

}
