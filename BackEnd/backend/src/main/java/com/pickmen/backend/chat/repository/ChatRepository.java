package com.pickmen.backend.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickmen.backend.chat.model.Chat;



public interface ChatRepository extends JpaRepository<Chat, Long>{

}
