package com.pickmen.backend.user.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.dto.MentorDto;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MentorService {

	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public User getMentor(long id) {
		return userRepository
				.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("해당 유저(멘토)는 존재하지 않습니다."));
	}
	
	@Transactional(readOnly = true)
	public List<User> getMentorList(String teachSector) {
		return userRepository.MentorFindByTeachSector(teachSector);
		// return userRepository.findAllByRole(RoleType.MENTOR);
	}
	
	@Transactional(readOnly = true)
	public Page<User> getMentorList(Pageable pageable) {
		return userRepository.findAll(pageable);
	}
	
	@Transactional
	public User updateMentor(long id, User user) {
		Optional<User> optionalMentor = userRepository.findById(id);
	    User findMentor = optionalMentor.orElseThrow(() -> new UsernameNotFoundException("해당 사용자는 없습니다."));	    
	    
	    // 프로필 이미지 변경
	    findMentor.setProfileImage(user.getProfileImage());
	    
	    // 가르치는 분야 변경
	    findMentor.setTeachSector(user.getTeachSector());
	    // 멘토링 가능 유무 변경 . Boolean type의 Getter의 경우 getXXX이 아닌 isXXX임.
	    findMentor.setActiveCanTeach(user.isActiveCanTeach());	    
	    
	    return userRepository.save(findMentor);
	}
}
