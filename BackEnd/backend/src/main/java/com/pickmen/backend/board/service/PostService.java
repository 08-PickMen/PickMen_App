package com.pickmen.backend.board.service;

import java.util.List;

import com.pickmen.backend.board.model.Post;
import com.pickmen.backend.board.repository.PostRepository;
import com.pickmen.backend.user.controller.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostService {

  @Autowired private PostRepository PostRepository;

  @Transactional
  public Post write(Post board, User user) {
    board.setCount(0);
    board.setUser(user);
    final Post savedBoard = PostRepository.save(board);
    return savedBoard;
  }

  @Transactional(readOnly = true)
  public Page<Post> getPostList(Pageable pageable) {
    return PostRepository.findAll(pageable);
  }

  @Transactional(readOnly = true)
  public Post getPost(long id) {
    return PostRepository
        .findById(id)
        .orElseThrow(() -> new IllegalArgumentException("해당 글은 존재하지 않습니다."));
  }

  public void delete(long id) {
    PostRepository.deleteById(id);
  }

  @Transactional
  public void upcount(long id){
    Post findBoard = this.getPost(id); // 영속화 완료 (영속화 컨텍스트에 보관)
    // 영속화된 객체를 수정
    findBoard.setCount(findBoard.getCount()+1);

  }

  @Transactional
  public void update(long id, Post board) {
    Post findBoard = this.getPost(id); // 영속화 완료 (영속화 컨텍스트에 보관)

    // 영속화된 객체를 수정
    findBoard.setTitle(board.getTitle());
    findBoard.setContent(board.getContent());

    // Transactional 에 의해 마지막에 commit 되면서,
    // 영속화 컨텍스트에 위치한 객체가 업데이트 됨 -> 더티 체킹에 의해 flush 됨
  }
}
