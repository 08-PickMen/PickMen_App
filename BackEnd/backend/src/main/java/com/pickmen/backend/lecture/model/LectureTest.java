package com.pickmen.backend.lecture.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Table(name = "lectureTest")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
// @DynamicInsert // null 값은 빼고 SQL문을 만든다
@Entity // 알아서 MySQL 테이블을 생성
public class LectureTest {

  @Id // PK
  @GeneratedValue(strategy = GenerationType.IDENTITY) // DB 설정의 넘버링 전략을 따라감
  private long id; // 시퀀스 
  
  @Column(unique = true)
  private String name;
}
