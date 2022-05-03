package com.pickmen.backend.controller;

import com.pickmen.backend.service.BoardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class BoardController {

  @Autowired private BoardService boardService;

  // @AuthenticationPrincipal PrincipalDetail principalDetail
  // 위 코드를 통해 세션에 저장된 사용자 정보를 가져올 수 있다.
  @GetMapping({"", "/"})
  public String index(
      Model model,
      @PageableDefault(size = 3, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
    model.addAttribute("boards", boardService.getBoardList(pageable));
    return "index";
  }

  @GetMapping("/board/{id}")
  public String boardDetail(@PathVariable long id, Model model) {
    model.addAttribute("board", boardService.getBoard(id));
    return "board/detail";
  }

  @GetMapping("/board/saveForm")
  public String boardSaveForm() {
    return "board/saveForm";
  }

  @GetMapping("/board/{id}/updateForm")
  public String boardUpdateForm(@PathVariable long id, Model model) {
    model.addAttribute("board", boardService.getBoard(id));
    return "board/updateForm";
  }
}
