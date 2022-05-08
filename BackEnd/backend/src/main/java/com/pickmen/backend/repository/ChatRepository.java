package com.pickmen.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickmen.backend.model.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long>{

}
