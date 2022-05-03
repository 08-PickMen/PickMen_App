package com.pickmen.backend.controller.api;

import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.model.Board;
import com.pickmen.backend.service.BoardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

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
