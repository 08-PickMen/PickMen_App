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

    @PostMapping("/ocr/certifyReport")
    public String detectText(@RequestParam(value = "file", required = false) MultipartFile uploadfile) throws IOException{
        return ocrService.detectText(uploadfile);
    }


}
