package com.pickmen.backend.user.runner;

import java.util.HashMap;
import com.pickmen.backend.user.model.School;
import com.pickmen.backend.user.repository.SchoolRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class SchoolRunner implements ApplicationRunner {
    @Autowired
    SchoolRepository schoolRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.print("Count : " + schoolRepository.count());
        if (schoolRepository.count() == 0) {
            try {
                Document document = Jsoup.connect(
                        "https://namu.wiki/w/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%EC%9D%98%20%EB%8C%80%ED%95%99%EA%B5%90%20%EB%AA%A9%EB%A1%9D")
                        .userAgent("Chrome/33.0.1750.152").get();
                // System.out.println(document.toString());
                Elements schools = document.getAllElements().select("a");
                String prev = "";
                HashMap<String, Integer> map = new HashMap<>();
                for (Element school : schools) {
                    if (prev != school.text() && school.text().endsWith("대학교") && map.get(school.text()) == null) {
                        map.put(school.text(), 1);
                        School newmajor = new School().builder().name(school.text()).build();
                        schoolRepository.save(newmajor);
                        prev = school.text();
                    }
                }
            } catch (NullPointerException ignored) {
                ignored.printStackTrace();
            }
        }
    }
}
