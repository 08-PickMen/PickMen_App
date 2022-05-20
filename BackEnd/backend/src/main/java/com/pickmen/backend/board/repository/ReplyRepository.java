package com.pickmen.backend.board.repository;


import java.util.List;

import com.pickmen.backend.board.model.Reply;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {

<<<<<<< HEAD
=======
    public List<Reply> findAllByBoardOrderByCreateDate(long boardId);
>>>>>>> 7c492319a66a3a7d7132b9597c2925434a81ee7f






    
}
