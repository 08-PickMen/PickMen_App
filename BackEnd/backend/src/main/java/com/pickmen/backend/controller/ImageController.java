package com.pickmen.backend.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.pickmen.backend.dto.FileDto;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
class ImageController{

    @PostMapping("/upload")
    public String upload(MultipartFile[] uploadfile){

        List<FileDto> list=new ArrayList<>();


        try{
        for(MultipartFile file: uploadfile)
        {
            if(!file.isEmpty())
            {
                FileDto dto=new FileDto(UUID.randomUUID().toString(),file.getOriginalFilename(),file.getContentType());
                list.add(dto);
                File newFileName=new File(dto.getUuid()+"_"+dto.getFileName());
                
                file.transferTo(newFileName);
                System.out.println(newFileName);
            }
        }
    }
    catch(Exception e){
        e.printStackTrace();
        return "파일 업로드 실패";
    }
    return "파일 업로드 성공";
    
    }

    @GetMapping("/display")
    public ResponseEntity<Resource> display(String filename) {
        String path = "C:\\upload\\";
        String folder = "";

        filename="1.PNG";
        //파일 형식 붙여야 함.
        Resource resource = new FileSystemResource(path + folder + filename);
        if(!resource.exists()) {
            System.out.println("이미지 못 찾음");
            return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
        }
        HttpHeaders header = new HttpHeaders();
        Path filePath = null;
        try{
            filePath = Paths.get(path + folder + filename);
            header.add("Content-type", Files.probeContentType(filePath));
        }catch(IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }
}