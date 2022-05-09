package com.pickmen.backend.controller;

import java.io.IOException;

import com.pickmen.backend.ocr.ocrService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
class testController {


    @Autowired
    private ocrService ocrService;


    @GetMapping("/auth/test")
    public String getHello() {
        System.out.println("test");
        return "Hello World";
    }

    @PostMapping("auth/test2")
    public String detectText(@RequestParam(value = "file", required = false) MultipartFile uploadfile) throws IOException{


        // for(MultipartFile file: uploadfile)
        // {
        //     if(!file.isEmpty())
        //     {
        //         FileDto dto=new FileDto(UUID.randomUUID().toString(),file.getOriginalFilename(),file.getContentType());
        //         list.add(dto);
        //         File newFileName=new File(dto.getUuid()+"_"+dto.getFileName());
                
        //         file.transferTo(newFileName);
        //         System.out.println(newFileName);
        //     }
        // }
        System.out.println("test2");
        System.out.println(ocrService.detectText(uploadfile));
        //ocrService.detectText();
        return "Detect Text";
    }


}
