package com.pickmen.backend.user.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.dto.MentorProfileDto;
import com.pickmen.backend.user.model.Lecture;
import com.pickmen.backend.user.model.Major;
import com.pickmen.backend.user.model.User;
import com.pickmen.backend.user.model.UserLecture;
import com.pickmen.backend.user.repository.LectureRepository;
import com.pickmen.backend.user.repository.MajorRepository;
import com.pickmen.backend.user.repository.UserLectureRepository;
import com.pickmen.backend.user.repository.UserRepository;

import org.hibernate.cache.spi.entry.CollectionCacheEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MentorService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MajorRepository majorRepository;

	@Autowired
	private LectureRepository lectureRepository;

	@Autowired
	private UserLectureRepository userLectureRepository;

	@Transactional(readOnly = true)
	public User getMentor(long id) {
		return userRepository
				.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("해당 유저(멘토)는 존재하지 않습니다."));
	}

	// MentorProfileDto로 변환하여 Mentor profile에 필요한 정보만을 반환
	// stream() 사용
	@Transactional(readOnly = true)
	public List<MentorProfileDto> getMentorList() {
		List<User> users = userRepository.findAllByRole(RoleType.MENTOR);
		List<MentorProfileDto> mentorProfileDtos = new ArrayList<>();
		Lecture lecture1 = new Lecture();
		Lecture lecture2 = new Lecture();
		int i;

		for (i = 0; i < users.size(); i++) {
			if (users.get(i).getUserLectures().size() != 0) {
				lecture1 = users.get(i).getUserLectures().get(0).getLecture();
				lecture2 = users.get(i).getUserLectures().get(1).getLecture();
			}
			mentorProfileDtos.add(MentorProfileDto.fromEntity(users.get(i), lecture1, lecture2));
		}

		return mentorProfileDtos;
	}

	@Transactional(readOnly = true)
	public Page<User> getMentorList(Pageable pageable) {

		return userRepository.findAll(pageable);
	}

	// MentorProfileDto로 변환하여 Mentor profile에 필요한 정보만을 반환
	// stream() 사용
	/*
	 * @Transactional(readOnly = true)
	 * public List<MentorProfileDto> getMentorListByMajor(long major_id) {
	 * log.info("getMentorListByMajor is called");
	 * return userRepository.findAllByRoleAndMajor(RoleType.MENTOR,
	 * majorRepository.getById(major_id))
	 * .stream().map(MentorProfileDto::fromEntity).collect(Collectors.toList());
	 * }
	 */

	@Transactional
	public User updateMentor(long id, User user, List<Long> lectureList) {
		Optional<User> optionalMentor = userRepository.findById(id);
		User findMentor = optionalMentor.orElseThrow(() -> new UsernameNotFoundException("해당 사용자는 없습니다."));

		// 닉네임, 자기소개, 거주지, 멘토링 내용 변경
		if (user.getNickname() != null) {
			findMentor.setNickname(user.getNickname());
		}

		if (user.getIntroduceMyself() != null) {
			findMentor.setIntroduceMyself(user.getIntroduceMyself());
		}

		if (user.getLivingWhere() != null) {
			findMentor.setLivingWhere(user.getLivingWhere());
		}

		if (user.getMentoringContents() != null) {
			findMentor.setMentoringContents(user.getMentoringContents());
		}

		// 가르치는 분야 변경
		if (lectureList != null) {
			int i;
			UserLecture userLecture = new UserLecture();
			// 기존 가르치는 분야 삭제
			userLectureRepository.deleteAllByUserId(findMentor.getId());

			for (i = 0; i < lectureList.size(); i++) {
				userLecture = UserLecture.builder().user(findMentor)
						.lecture(lectureRepository.findById(lectureList.get(i)).orElseThrow()).build();

				userLectureRepository.save(userLecture);
			}
		} else {
			System.out.println("전공 강의 분야 변경 없음");
		}

		// 멘토링 가능 유무 변경 . Boolean type의 Getter의 경우 getXXX이 아닌 isXXX임.
		if (user.isActiveCanTeach() != findMentor.isActiveCanTeach()) {
			findMentor.setActiveCanTeach(user.isActiveCanTeach());
		}

		return userRepository.save(findMentor);
	}

	public List<MentorProfileDto> recommendMentor(@AuthenticationPrincipal PrincipalDetail principalDetail) {
		List<UserLecture> lecture = principalDetail.getLecture();
		Major major = principalDetail.getMajor();
		List<User> userlist = userRepository.findAllByRoleOrderByAverageRating(RoleType.MENTOR);
		try {
			userlist.sort(new Comparator<User>() {

				@Override
				public int compare(User o1, User o2) {

					int o1_score = 0;
					int o2_score = 0;

					List<UserLecture> o1_lecture = o1.getUserLectures();
					List<UserLecture> o2_lecture = o2.getUserLectures();
					Major o1_major = o1.getMajor();
					Major o2_major = o2.getMajor();

					for (int i = 0; i < lecture.size(); i++) {
						for (int j = 0; j < lecture.size(); j++) {
							if (lecture.get(i).getLecture().getName().equals(o1_lecture.get(j).getLecture().getName()))
								o1_score += 2;
							if (lecture.get(i).getLecture().getName().equals(o2_lecture.get(j).getLecture().getName()))
								o2_score += 2;
						}
					}

					if (o1_major.getName().equals(major.getName()))
						o1_score += 1;
					if (o2_major.getName().equals(major.getName()))
						o2_score += 1;

					if (o1_score < o2_score)
						return -1;

					else if (o1_score > o2_score)
						return 1;
					else
						return 0;
				}

			});

			List<MentorProfileDto> mentorProfileDtos = new ArrayList<>();
			Lecture lecture1 = new Lecture();
			Lecture lecture2 = new Lecture();
			int i;

			for (i = 0; i < userlist.size(); i++) {
				if (userlist.get(i).getUserLectures().size() != 0) {
					lecture1 = userlist.get(i).getUserLectures().get(0).getLecture();
					lecture2 = userlist.get(i).getUserLectures().get(1).getLecture();
				}
				mentorProfileDtos.add(MentorProfileDto.fromEntity(userlist.get(i), lecture1, lecture2));
			}

			return mentorProfileDtos;
		} catch (NullPointerException e) {
			e.printStackTrace();
			return null;
		}
	}
}
