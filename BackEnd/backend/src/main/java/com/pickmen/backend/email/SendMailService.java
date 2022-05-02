package com.study.blog.email;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.config.TypeFilterParser;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class SendMailService {
    
    @Autowired
    private JavaMailSender sender;

    public boolean sendEmail(String to, String sub, String body){
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try{
            helper.setTo(to);
            helper.setSubject(sub);
            helper.setText(body);
        }
        catch(MessagingException e){
            e.printStackTrace();
            return false;
        }
        sender.send(message);
        return true;
    }
}
