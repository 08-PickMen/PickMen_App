package com.pickmen.backend.board.model;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.pickmen.backend.user.model.User;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

  private String nickname;

  @CreationTimestamp private LocalDateTime createDate;

  // Reply N : 1 Board -> 한개의 게시물에는 답변이 여러개 달릴 수 있음
  @ManyToOne
  @JoinColumn(name = "boardId")
  private Post board;

  // Reply N : 1 User -> 한명의 사용자는 여러개의 답변을 달 수 있음
  @ManyToOne
  @JoinColumn(name = "userId")
  private User user;
}
