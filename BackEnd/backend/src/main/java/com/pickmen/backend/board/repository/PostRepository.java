package com.pickmen.backend.board.repository;


import java.util.List;

import com.pickmen.backend.board.model.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // @Query(value = "select p from Post p where p.")
    // public List<Post> SelectByNickname(); 

    public Page<Post> findByTitleContaining(String title,Pageable pageable);
    public Page<Post> findByTitleOrContentContaining(String title,String content,Pageable pageable);
    public Page<Post> findByContentContaining(String content,Pageable pageable);






    
}
