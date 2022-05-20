package com.pickmen.backend.board.controller;

<<<<<<< HEAD
import javax.transaction.Transactional;

import com.pickmen.backend.board.model.Post;
=======
import java.util.List;

import javax.transaction.Transactional;

>>>>>>> 7c492319a66a3a7d7132b9597c2925434a81ee7f
import com.pickmen.backend.board.model.Reply;
import com.pickmen.backend.board.repository.PostRepository;
import com.pickmen.backend.board.repository.ReplyRepository;
import com.pickmen.backend.config.auth.PrincipalDetail;
import com.pickmen.backend.dto.ResponseDto;
<<<<<<< HEAD
=======
import com.pickmen.backend.user.repository.UserRepository;
>>>>>>> 7c492319a66a3a7d7132b9597c2925434a81ee7f

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.PathVariable;
=======
import org.springframework.web.bind.annotation.GetMapping;
>>>>>>> 7c492319a66a3a7d7132b9597c2925434a81ee7f
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ReplyController {

    @Autowired
    private ReplyRepository replyRepository;
<<<<<<< HEAD
=======

    
    @Autowired
    private UserRepository userRepository;

>>>>>>> 7c492319a66a3a7d7132b9597c2925434a81ee7f
    
    @Autowired
    private PostRepository postRepository;

<<<<<<< HEAD

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
=======
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
>>>>>>> 7c492319a66a3a7d7132b9597c2925434a81ee7f
             } catch (Exception e) {
            e.printStackTrace();
            
            return new ResponseDto<Reply>(HttpStatus.INTERNAL_SERVER_ERROR.value(),null);
       
<<<<<<< HEAD

=======
>>>>>>> 7c492319a66a3a7d7132b9597c2925434a81ee7f
        }
    } 

    
 
}
