package com.pickmen.backend.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickmen.backend.chat.model.Chat;
import com.pickmen.backend.chat.model.ChatDto;



public interface ChatRepository extends JpaRepository<Chat, Long>{

	List<Chat> findAllByChatRoomId(long chatRoom_id);
	
	Chat findByChatRoomId(long chatRoom_id);
}
