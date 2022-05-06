package com.pickmen.backend.advertiser.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table(name = "advertiser")
@Getter
@Setter
@ToString  //비정적 변수와 클래스이름을 같이 출력시켜준다. 문자열로
@Builder
@Entity // 알아서 MySQL 테이블을 생성
public class Advertiser {

    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB 설정의 넘버링 전략을 따라감
    private long id;

    @Column(nullable = false, length = 30, unique = true)
    private String name;

    @Column(nullable = false, length = 30)
    private String email;
    
    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = true)
    private String target;
    
    
    
}
