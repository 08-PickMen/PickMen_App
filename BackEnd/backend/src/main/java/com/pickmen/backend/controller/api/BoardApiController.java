package com.study.blog.controller.api;

import com.study.blog.config.auth.PrincipalDetail;
import com.study.blog.dto.ResponseDto;
import com.study.blog.model.Board;
import com.study.blog.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api")
public class BoardApiController {

  @Autowired private BoardService boardService;

  @PostMapping("board")
  public ResponseDto<Integer> board(
      @RequestBody Board board, @AuthenticationPrincipal PrincipalDetail principalDetail) {
    boardService.write(board, principalDetail.getUser());
    return new ResponseDto<>(HttpStatus.OK.value(), 1);
  }

  @PutMapping("board/{id}")
  public ResponseDto<Integer> board(@PathVariable long id, @RequestBody Board board) {
    boardService.update(id, board);
    return new ResponseDto<>(HttpStatus.OK.value(), 1);
  }

  @DeleteMapping("board/{id}")
  public ResponseDto<Integer> board(@PathVariable long id) {
    boardService.delete(id);
    return new ResponseDto<>(HttpStatus.OK.value(), 1);
  }
}
