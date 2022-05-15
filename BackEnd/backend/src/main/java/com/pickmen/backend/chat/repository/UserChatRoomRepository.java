package com.pickmen.backend.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pickmen.backend.chat.model.UserChatRoom;

@Repository
public interface UserChatRoomRepository extends JpaRepository<UserChatRoom, Long>{

	List<UserChatRoom> findAllByUserId(long user_id);
	
	UserChatRoom findById(long id);
	
	boolean existsByUserId(long user_id);
}
