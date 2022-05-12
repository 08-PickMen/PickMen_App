package com.pickmen.backend.user.controller.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.pickmen.backend.SchoolType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table(name = "advertisement")
@Getter
@Setter
@ToString  //비정적 변수와 클래스이름을 같이 출력시켜준다. 문자열로
@Builder
@Entity // 알아서 MySQL 테이블을 생성
public class Advertisement {

    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB 설정의 넘버링 전략을 따라감
    private long id;

    private String target;

    private Boolean active;

    private String content;

    private Date duration;
    
    @Enumerated(EnumType.STRING)
    private SchoolType school;

    @ManyToOne(fetch = FetchType.EAGER) // 1개밖에 없으므로, 바로 가지고 옴
    @JoinColumn(name = "userId")
    private User user_id;
    
    
    
}
