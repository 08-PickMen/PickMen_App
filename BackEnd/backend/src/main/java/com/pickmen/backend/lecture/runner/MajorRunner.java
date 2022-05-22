package com.pickmen.backend.lecture.runner;

import com.pickmen.backend.lecture.model.MajorTest;
import com.pickmen.backend.lecture.repository.MajorTestRepository;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class MajorRunner implements ApplicationRunner {

    @Autowired MajorTestRepository majorRepository;

    
    @Override
    public void run(ApplicationArguments args) throws Exception {
        
        if(majorRepository.count()==0){
        try {
            Document document = Jsoup.connect("https://namu.wiki/w/%EC%95%84%EC%A3%BC%EB%8C%80%ED%95%99%EA%B5%90/%ED%95%99%EB%B6%80").userAgent("Chrome/41.0.2228.0").get();
           
            //System.out.println(document.toString());
      
            Elements majors=document.getAllElements().select("a");
            String prev="";
            for(Element major:majors)
            {
                if(prev!=major.text() && major.text().endsWith("학과")){
                    MajorTest newmajor=new MajorTest().builder().name(major.text()).build();
                    majorRepository.save(newmajor);
                    prev=major.text();
                }

            }
    
      
          } catch (Exception ignored) {
              ignored.printStackTrace();
          }
    
        
    }
}
  }
