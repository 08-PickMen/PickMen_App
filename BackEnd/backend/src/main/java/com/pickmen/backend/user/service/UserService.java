package com.pickmen.backend.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.pickmen.backend.dto.LectureDto;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.model.UserLecture;
import com.pickmen.backend.user.repository.LectureRepository;
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
	private BCryptPasswordEncoder passwordEncoder;

	@Transactional
	public User join(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(user.getRole());
		return userRepository.save(user);
	}

	// lectureList 넣어서 Test하는 회원가입 api 테스트 - 테스트 완료
	@Transactional
	public User joinTest(User user, List<Long> lectureList) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(user.getRole());
		// return userRepository.save(user);
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
