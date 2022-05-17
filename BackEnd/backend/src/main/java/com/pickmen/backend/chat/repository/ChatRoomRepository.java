package com.pickmen.backend.chat.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pickmen.backend.chat.model.ChatRoom;


@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>{

}
