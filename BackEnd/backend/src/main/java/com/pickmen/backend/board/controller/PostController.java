package com.pickmen.backend.board.controller;

import java.util.List;

import com.pickmen.backend.board.model.Post;
import com.pickmen.backend.board.service.PostService;
import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class PostController {

  @Autowired private PostService postService;

  @Autowired private UserRepository userRepository;

  // @AuthenticationPrincipal PrincipalDetail principalDetail
  // 위 코드를 통해 세션에 저장된 사용자 정보를 가져올 수 있다.

  @GetMapping("post/getPost")
  public Page<Post> postList(@PageableDefault(size = 5, sort="createDate",direction = Sort.Direction.DESC)Pageable pageable){
    return postService.getPostList(pageable);
  }

  @PostMapping("post/deletePost")
  public String postDelete(@RequestParam("id") long id, @AuthenticationPrincipal PrincipalDetail principalDetail){
    try{
    Post post=postService.getPost(id);
    if(post.getUser().getId()==principalDetail.getUserId()){
    postService.delete(id);
    return "삭제 완료";
    }
    else{
      return "삭제 실패";
    }
    }
    catch(Exception e){
      e.printStackTrace();
      return "삭제 실패";
    }
  }


  
  @PostMapping("post/upcountPost")
  public String postUpCount(long id){
    try{
      postService.upcount(id);
    return "조회수 수정 성공";
    }
    catch(Exception e){
      e.printStackTrace();
      return "조회수 수정 실패";
    }
  }

  
  @PostMapping("post/updatePost")
  public String postUpdate(long id,Post board){
    try{
    postService.update(id, board);
    return "수정 완료";
    }
    catch(Exception e){
      e.printStackTrace();
      return "수정 실패";
    }
  }


  @PostMapping("post/writePost")
  public String postWrite(@RequestParam("title") String title,@RequestParam("content")  String content, @AuthenticationPrincipal PrincipalDetail principalDetail){
    try{
    Post board=Post.builder().title(title).content(content).build();
    System.out.println(principalDetail.getUsername());
    postService.write(board,userRepository.findByUsernameAndPassword(principalDetail.getUsername(),principalDetail.getPassword()).get());
   // boardService.write(board, principalDetail.getUser());
    
     return "작성 완료";
  }
    catch(Exception e){
      e.printStackTrace();
      return "작성 실패";
    }

  }
}
