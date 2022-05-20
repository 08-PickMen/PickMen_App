package com.pickmen.backend.board.controller;

import javax.transaction.Transactional;

import com.pickmen.backend.board.model.Post;
import com.pickmen.backend.board.model.Reply;
import com.pickmen.backend.board.repository.PostRepository;
import com.pickmen.backend.board.repository.ReplyRepository;
import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.dto.ResponseDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ReplyController {

    @Autowired
    private ReplyRepository replyRepository;
    
    @Autowired
    private PostRepository postRepository;


    @PostMapping("Reply/Delete/{replyId}")
    public ResponseDto<Reply> deleteReply(@PathVariable long replyId){

        try {
            Reply reply=replyRepository.findById(replyId).get();
            replyRepository.delete(reply);
            
        return new ResponseDto<Reply>(HttpStatus.OK.value(),null);
             } catch (Exception e) {
            e.printStackTrace();
            
            return new ResponseDto<Reply>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
       

        }
    } 

    

    @Transactional
    @PostMapping("Reply/Post/{boardId}")
    public ResponseDto<Reply> postReply(@PathVariable long boardId, @AuthenticationPrincipal PrincipalDetail principalDetail, String content){

        try {
            Post post=postRepository.getById(boardId);
            Reply reply=new Reply().builder().content(content).nickname(principalDetail.getNickName()).user(principalDetail.getUser()).build();
            post.addReply(reply);
            
        return new ResponseDto<Reply>(HttpStatus.OK.value(),null);
             } catch (Exception e) {
            e.printStackTrace();
            
            return new ResponseDto<Reply>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
       

        }
    } 

    
 
}
