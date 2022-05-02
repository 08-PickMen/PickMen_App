package com.study.blog.service;

import com.study.blog.model.Board;
import com.study.blog.model.User;
import com.study.blog.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BoardService {

  @Autowired private BoardRepository boardRepository;

  @Transactional
  public Board write(Board board, User user) {
    board.setCount(0);
    board.setUser(user);
    final Board savedBoard = boardRepository.save(board);
    return savedBoard;
  }

  @Transactional(readOnly = true)
  public List<Board> getBoardList() {
    return boardRepository.findAll();
  }

  @Transactional(readOnly = true)
  public Page<Board> getBoardList(Pageable pageable) {
    return boardRepository.findAll(pageable);
  }

  @Transactional(readOnly = true)
  public Board getBoard(long id) {
    return boardRepository
        .findById(id)
        .orElseThrow(() -> new IllegalArgumentException("해당 글은 존재하지 않습니다."));
  }

  public void delete(long id) {
    boardRepository.deleteById(id);
  }

  @Transactional
  public void update(long id, Board board) {
    Board findBoard = this.getBoard(id); // 영속화 완료 (영속화 컨텍스트에 보관)

    // 영속화된 객체를 수정
    findBoard.setTitle(board.getTitle());
    findBoard.setContent(board.getContent());

    // Transactional 에 의해 마지막에 commit 되면서,
    // 영속화 컨텍스트에 위치한 객체가 업데이트 됨 -> 더티 체킹에 의해 flush 됨
  }
}
