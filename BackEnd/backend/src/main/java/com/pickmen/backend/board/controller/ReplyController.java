package com.pickmen.backend.board.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
import org.springframework.web.bind.annotation.GetMapping;
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


    @Transactional
    @PostMapping("Reply/Update/{replyId}")
    public ResponseDto<Reply> updateReply(@PathVariable long replyId, String content){

        try {
            Reply reply=replyRepository.findById(replyId).get();
            reply.setContent(content);

            
            
        return new ResponseDto<Reply>(HttpStatus.OK.value(),null);
             } catch (Exception e) {
            e.printStackTrace();
            
            return new ResponseDto<Reply>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
       

        }
    } 

    @Transactional
    @GetMapping("Reply/Get/{postId}")
    public ResponseDto<List<Reply>> getReply(@PathVariable long postId){
        try {
            List<Reply> replylist=postRepository.getById(postId).getReply();

            for(Reply reply:replylist){
                LocalDateTime localDateTime=reply.getCreateDate();
                if(reply.getCreateDateTime()!=""){
                reply.setCreateDateTime(localDateTime.format(DateTimeFormatter.ofPattern("yy년 MM월 dd일 HH:mm")));
                }
            }
        return new ResponseDto<List<Reply>>(HttpStatus.OK.value(),replylist);
             } catch (Exception e) {
            e.printStackTrace();
            return new ResponseDto<List<Reply>>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
        }
    } 


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