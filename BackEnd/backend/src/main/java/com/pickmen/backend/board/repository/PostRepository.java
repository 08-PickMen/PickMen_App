package com.pickmen.backend.board.repository;


import com.pickmen.backend.board.model.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
  
    public Page<Post> findByLivingwhere(String livingwhere,Pageable pageable);
    public Page<Post> findByNickname(String nickname,Pageable pageable);
    public Page<Post> findByTitleContaining(String title,Pageable pageable);
    public Page<Post> findByTitleOrContentContaining(String title,String content,Pageable pageable);
    public Page<Post> findByContentContaining(String content,Pageable pageable);







    
}
