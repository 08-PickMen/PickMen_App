package com.pickmen.backend.board.controller;

import java.util.List;

import com.pickmen.backend.board.model.Board;
import com.pickmen.backend.board.service.BoardService;
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
public class BoardController {

  @Autowired private BoardService boardService;

  @Autowired private UserRepository userRepository;

  // @AuthenticationPrincipal PrincipalDetail principalDetail
  // 위 코드를 통해 세션에 저장된 사용자 정보를 가져올 수 있다.

  @GetMapping("/board/list")
  public Page<Board> boardList(@PageableDefault(size = 99, sort="createDate",direction = Sort.Direction.DESC)Pageable pageable){
    return boardService.getBoardList(pageable);
  }

  @PostMapping("/board/delete")
  public String boardDelete(long id){
    try{
    boardService.delete(id);
    return "삭제 완료";
    }
    catch(Exception e){
      e.printStackTrace();
      return "삭제 실패";
    }
  }

  
  @PostMapping("/board/update")
  public String boardUpdate(long id,Board board){
    try{
    boardService.update(id, board);
    return "수정 완료";
    }
    catch(Exception e){
      e.printStackTrace();
      return "수정 실패";
    }
  }


  @PostMapping("/board/write")
  public String boardWrite(@RequestParam("title") String title,@RequestParam("content")  String content, @AuthenticationPrincipal PrincipalDetail principalDetail){
    try{
    Board board=Board.builder().title(title).content(content).build();
    System.out.println(principalDetail.getUsername());
    boardService.write(board,userRepository.findByUsernameAndPassword(principalDetail.getUsername(),principalDetail.getPassword()).get());
   // boardService.write(board, principalDetail.getUser());
    
     return "작성 완료";
  }
    catch(Exception e){
      e.printStackTrace();
      return "작성 실패";
    }

  }
}
