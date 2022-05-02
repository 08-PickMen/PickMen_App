package com.study.blog.model;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "reply")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Reply {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(nullable = false, length = 200)
  private String content;

  @CreationTimestamp private LocalDateTime createDate;

  // Reply N : 1 Board -> 한개의 게시물에는 답변이 여러개 달릴 수 있음
  @ManyToOne
  @JoinColumn(name = "boardId")
  private Board board;

  // Reply N : 1 User -> 한명의 사용자는 여러개의 답변을 달 수 있음
  @ManyToOne
  @JoinColumn(name = "userId")
  private User user;
}
