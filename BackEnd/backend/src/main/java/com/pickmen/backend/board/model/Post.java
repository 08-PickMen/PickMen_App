package com.pickmen.backend.board.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.pickmen.backend.user.model.User;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "post")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(nullable = false, length = 100)
  private String title;

  @Lob // 대용량 데이터를 쓸때 사용
  private String content;

  
  private String nickname;
  // @ColumnDefault("0")
  private long count; // 조회

  // Board N : 1 User -> 한명의 유저는 여러개의 게시글을 사용할 수 있으므로..
  @ManyToOne(fetch = FetchType.EAGER) // 1개밖에 없으므로, 바로 가지고 옴
  @JoinColumn(name = "userId")
  private User user; // 작성이

  // Board 1 : N Reply -> 1개의 게시물에는 여러개의 답글이 달릴 수 있으므로
  @OneToMany(
      // 데이터가 여러개이므로, 가지고 올 때 같이 가지고 오는게 낫지만 (-> LAZY),
      // 반드시 필요하기 때문에 Eager 전략 사용
      fetch = FetchType.EAGER,
      mappedBy = "board",cascade = {CascadeType.ALL}) // FK 가 아님 -> 컬럼을 만들지 말아야 함
  private List<Reply> reply = new ArrayList<>();

  public void addReply(Reply reply){
    this.getReply().add(reply);
    reply.setBoard(this);
  }

  @CreationTimestamp private LocalDateTime createDate;
}