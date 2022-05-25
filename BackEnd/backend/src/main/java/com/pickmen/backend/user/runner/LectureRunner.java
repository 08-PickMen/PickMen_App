package com.pickmen.backend.user.runner;

import java.io.File;
import java.io.FileInputStream;
import java.util.HashSet;
import java.util.Iterator;

import com.pickmen.backend.user.model.Lecture;
import com.pickmen.backend.user.repository.LectureRepository;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Component;

@Component
public class LectureRunner implements ApplicationRunner {

    @Autowired LectureRepository lectureRepository;


    @Override
    public void run(ApplicationArguments args) throws Exception {
        String path="input.xlsx";
        if(lectureRepository.count()==0 && new File(path).exists() ){
        FileInputStream fis = new FileInputStream(new File(path));
        //excel 파일 위치 설정 필요함.
        XSSFWorkbook workbook = new XSSFWorkbook(fis);

        Sheet sheet=workbook.getSheetAt(0);
        Iterator<Row> rowIterator=sheet.iterator();

        String prev="";
    
        while(rowIterator.hasNext()){
            Row row=rowIterator.next();
            if(row.getCell(1).getStringCellValue().equals("과목명")){
                
            }
            else{
                Lecture lecture=new Lecture().builder().name(row.getCell(1).getStringCellValue()).build();
                if(prev!=lecture.getName()){
                    lectureRepository.save(lecture);
                    prev=lecture.getName();
                }
            
                }
            }
        }
    }
        






        
    }
