package com.pickmen.backend.user.controller.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
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

import com.pickmen.backend.ReportType;
import com.pickmen.backend.board.model.Post;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Table(name = "report")
@Getter
@Setter
@ToString  //비정적 변수와 클래스이름을 같이 출력시켜준다. 문자열로
@Builder
@Entity // 알아서 MySQL 테이블을 생성
public class Report {

    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB 설정의 넘버링 전략을 따라감
    private long id;

    @Enumerated(EnumType.STRING) // DB 는 RoleType 이 없기 때문에 String 타입이라고 알려줘야 함
    private ReportType type; // ENUM을 쓰는것이 좋다.
  
    @CreationTimestamp // Insert 할때 자동으로 날짜가 들어감
    @Column(nullable = false)
    private LocalDateTime createDate; // 생성일

    private String description;

    @ManyToOne(fetch = FetchType.EAGER) // 1개밖에 없으므로, 바로 가지고 옴
    @JoinColumn(name = "reportUserId")
    private User reportUser_id;

    @ManyToOne(fetch = FetchType.EAGER) // 1개밖에 없으므로, 바로 가지고 옴
    @JoinColumn(name = "targetUserId")
    private User targetUser_id;

    @ManyToOne(fetch = FetchType.EAGER) // 1개밖에 없으므로, 바로 가지고 옴
    @JoinColumn(name = "targetPostId")
    private Post targetPost_id;

}
