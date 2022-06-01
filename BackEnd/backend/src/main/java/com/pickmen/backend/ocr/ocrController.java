package com.pickmen.backend.ocr;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
class ocrController {


    @Autowired
    private ocrService ocrService;

    @PostMapping("certificate")
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
        return ocrService.detectText(uploadfile);
        //ocrService.detectText();
    }


}
