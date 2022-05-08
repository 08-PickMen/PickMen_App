package com.pickmen.backend.model;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

// ORM -> 오브젝트를 테이블로 매핑해주는 역할
// JPA 는 Java의 ORM

@Table(name = "user")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
// @DynamicInsert // null 값은 빼고 SQL문을 만든다
@Entity // 알아서 MySQL 테이블을 생성
public class User {

  @Id // PK
  @GeneratedValue(strategy = GenerationType.IDENTITY) // DB 설정의 넘버링 전략을 따라감
  private long id; // 시퀀스

  @Column(nullable = false, length = 30, unique = true)
  private String username; // 사용자 ID

  @Column(nullable = false, length = 100)
  private String password; // 비밀번호

  @Column(nullable = false, length = 50)
  private String email; // 이메일

  // @ColumnDefault("'USER'") -> 별로 안좋음
  @Enumerated(EnumType.STRING) // DB 는 RoleType 이 없기 때문에 String 타입이라고 알려줘야 함
  private RoleType role; // ENUM을 쓰는것이 좋다.
  
  

  @CreationTimestamp // Insert 할때 자동으로 날짜가 들어감
  @Column(nullable = false)
  private LocalDateTime createDate; // 생성일
}
