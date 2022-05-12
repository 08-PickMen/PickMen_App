package com.pickmen.backend.user.service;

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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class ImageService{

    public String upload(MultipartFile[] uploadfile){

        List<FileDto> list=new ArrayList<>();
        String filename="";


    try{
        for(MultipartFile file: uploadfile)
        {
            if(!file.isEmpty())
            {
                FileDto dto=new FileDto(UUID.randomUUID().toString(),file.getOriginalFilename(),file.getContentType());
                list.add(dto);
                File newFileName=new File(dto.getUuid()+"_"+dto.getFileName());
                
                file.transferTo(newFileName);
                filename=newFileName.toString();
                System.out.println(filename);
            }
        }
    }
    catch(Exception e){
        e.printStackTrace();
        return "";
    }
    return filename;
    
    }

    public ResponseEntity<Resource> delete(String filename){
        String path = "C:\\upload\\";
        String folder = "";

        //파일 형식 붙여야 함.
        File resource = new File(path + folder + filename);

        if(!resource.exists()) {
            return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
        }
        resource.delete();
        return new ResponseEntity<Resource>(HttpStatus.OK);

    }

    public ResponseEntity<Resource> display(String filename) {
        String path = "C:\\upload\\";
        String folder = "";

        //파일 형식 붙여야 함.
        Resource resource = new FileSystemResource(path + folder + filename);
        if(!resource.exists()) {
            return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
        }
        HttpHeaders header = new HttpHeaders();
        Path filePath = null;
        try{
            filePath = Paths.get(path + folder + filename);
            header.add("Content-type", Files.probeContentType(filePath));
        }catch(IOException e) {
            e.printStackTrace();
            return new ResponseEntity<Resource>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }
}