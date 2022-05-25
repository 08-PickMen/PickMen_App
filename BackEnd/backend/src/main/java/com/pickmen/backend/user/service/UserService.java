package com.pickmen.backend.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.pickmen.backend.dto.LectureDto;
import com.pickmen.backend.dto.MajorDto;
import com.pickmen.backend.dto.SchoolDto;
import com.pickmen.backend.user.model.Lecture;
import com.pickmen.backend.user.model.Major;
import com.pickmen.backend.user.model.School;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.model.UserLecture;
import com.pickmen.backend.user.repository.LectureRepository;
import com.pickmen.backend.user.repository.MajorRepository;
import com.pickmen.backend.user.repository.SchoolRepository;
import com.pickmen.backend.user.repository.UserLectureRepository;
import com.pickmen.backend.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserLectureRepository userLectureRepository;

	@Autowired
	private LectureRepository lectureRepository;
	
	@Autowired
	private MajorRepository majorRepository;
	
	@Autowired
	private SchoolRepository schoolRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	/*
	@Transactional
	public User join(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(user.getRole());
		return userRepository.save(user);
	}*/

	// lectureList 넣어서 Test하는 회원가입 api - 테스트 완료
	@Transactional
	public User join(User user, List<Long> lectureList) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(user.getRole());
		
		User saveUser = userRepository.save(user);
		int i;
		UserLecture userLecture = new UserLecture();

		for (i = 0; i < lectureList.size(); i++) {
			userLecture = UserLecture.builder().user(saveUser)
					.lecture(lectureRepository.findById(lectureList.get(i)).orElseThrow()).build();

			userLectureRepository.save(userLecture);
		}
		return saveUser;
	}
	
	// 로그인한 유저의 관심 강의 리스트 반환 (LectureDto로 lecture id와 name들만 리스트로 반환)
	@Transactional
	public List<LectureDto> getUserLectureList(Long user_id) {
		List<UserLecture> userLectures = userLectureRepository.findAllByUserId(user_id);
		List<LectureDto> lectureDtos = new ArrayList<>();
		int i;
		
		for(i = 0; i < userLectures.size(); i++) {
			lectureDtos.add(LectureDto.fromEntity(userLectures.get(i)));
		}
		
		return lectureDtos;
	}
	
	// 전공 전체 리스트를 MajorDto로 변환하여 id와 name들의 리스트로 반환
	@Transactional
	public List<MajorDto> getAllMajorList() {
		List<Major> majors = majorRepository.findAll();
		List<MajorDto> majorDtos = new ArrayList<>();
		int i;
		
		for(i = 0; i < majors.size(); i++) {
			majorDtos.add(MajorDto.fromEntity(majors.get(i)));
		}
		
		return majorDtos;
	}
	
	// 관심 강의(전문 강의) 전체 리스트를 LectureDto로 변환하여 id와 name들의 리스트로 반환
	@Transactional
	public List<LectureDto> getAllLectureList() {
		List<Lecture> lectures = lectureRepository.findAll();
		List<LectureDto> lectureDtos = new ArrayList<>();
		int i;
		
		for(i = 0; i < lectures.size(); i++) {
			lectureDtos.add(LectureDto.fromEntity(lectures.get(i)));
		}
		
		return lectureDtos;
		
	}
	
	// 학교 전체 리스트를 SchoolDto로 변환하여 id와 name들의 리스트로 반환
	@Transactional
	public List<SchoolDto> getAllSchoolList() {
		List<School> schools = schoolRepository.findAll();
		List<SchoolDto> schoolDtos = new ArrayList<>();
		int i;
		
		for(i = 0; i < schools.size(); i++) {
			schoolDtos.add(SchoolDto.fromEntity(schools.get(i)));
		}
		
		return schoolDtos;
	}

	@Transactional(readOnly = true) // select 할때 트랜잭션 시작, 서비스 종료 후 트랜잭션 종료
	public User login(User user) {
		Optional<User> optionalUser = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
		return optionalUser.orElseThrow(() -> new RuntimeException("Not found user"));
	}

	@Transactional
	public User updateUser(User user) {
		Optional<User> optionalUser = userRepository.findById(user.getId());
		User findUser = optionalUser.orElseThrow(() -> new UsernameNotFoundException("해당 사용자는 없습니다."));

		if (null != user.getPassword() && !"".equals(user.getPassword())) {
			findUser.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		// if (null != user.getEmail() && !"".equals(user.getEmail())) {
		// System.out.println("hello");
		// findUser.setEmail(user.getEmail());
		// }
		// 이메일 수정은 안됨

		return userRepository.save(findUser);
	}




}
