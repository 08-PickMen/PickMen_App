package com.pickmen.backend.board.repository;

import com.pickmen.backend.board.model.Board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {}
