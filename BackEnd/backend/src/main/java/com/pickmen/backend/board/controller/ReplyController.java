package com.pickmen.backend.board.controller;

import java.util.List;

import javax.transaction.Transactional;

import com.pickmen.backend.board.model.Reply;
import com.pickmen.backend.board.repository.PostRepository;
import com.pickmen.backend.board.repository.ReplyRepository;
import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.dto.ResponseDto;
import com.pickmen.backend.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ReplyController {

    @Autowired
    private ReplyRepository replyRepository;

    
    @Autowired
    private UserRepository userRepository;

    
    @Autowired
    private PostRepository postRepository;

    @GetMapping("Reply/Get")
    public ResponseDto<List<Reply>> getReply(long boardId){

        try {
            return new ResponseDto<List<Reply>>(HttpStatus.OK.value(),replyRepository.findAllByBoardOrderByCreateDate(boardId));
             } catch (Exception e) {
            e.printStackTrace();
            
            return new ResponseDto<List<Reply>>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
       
        }
    } 

    @Transactional
    @PostMapping("Reply/Post")
    public ResponseDto<Reply> postReply(long boardId, @AuthenticationPrincipal PrincipalDetail principalDetail, String content){

        try {
            Reply newReply=new Reply().builder().content(content).user(userRepository.getById(principalDetail.getUserId())).board(postRepository.getById(boardId)).build();
            return new ResponseDto<Reply>(HttpStatus.OK.value(),replyRepository.save(newReply));
             } catch (Exception e) {
            e.printStackTrace();
            
            return new ResponseDto<Reply>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
       
        }
    } 

    
 
}
