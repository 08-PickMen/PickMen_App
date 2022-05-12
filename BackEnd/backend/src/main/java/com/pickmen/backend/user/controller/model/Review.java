package com.pickmen.backend.user.controller.model;

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

@Table(name = "review")
@Getter
@Setter
@ToString  //비정적 변수와 클래스이름을 같이 출력시켜준다. 문자열로
@Builder
@Entity // 알아서 MySQL 테이블을 생성
public class Review {

    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB 설정의 넘버링 전략을 따라감
    private long id;
    
    private long review_id;

    @ManyToOne(fetch = FetchType.EAGER) // 1개밖에 없으므로, 바로 가지고 옴
    @JoinColumn(name = "targetId")
    private User target_id;
    
    private float rating;

    private long chatroom_id;
    
}
