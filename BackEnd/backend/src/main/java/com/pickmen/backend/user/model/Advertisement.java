package com.pickmen.backend.user.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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

    @ManyToOne(fetch = FetchType.EAGER) 
    @JoinColumn(name = "userId")
    private User user; // 작성이
    
    @Column(nullable= true)
    private String content;

    private Boolean active;

    private Date duration;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "schoolId")
    private School school;
}
