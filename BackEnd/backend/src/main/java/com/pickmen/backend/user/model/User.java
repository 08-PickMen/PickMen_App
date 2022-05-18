package com.pickmen.backend.user.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.SchoolType;
import com.pickmen.backend.chat.model.UserChatRoom;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Builder.Default;

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


   // 새로 입력   
   
   @OneToMany(mappedBy = "user")
   private List<UserChatRoom> userChatRooms = new ArrayList<>();

   @Column(nullable= true)
   private String nickname;
 
   @Column(nullable= true)
   @Enumerated(EnumType.STRING)
   private SchoolType school;
 
   @Column(nullable= true)
   private String profileImage;
   
   // "멘토" 에만 추가되는 부분들
   @Column(nullable= true)
   private String reportCard;
 
   @Column(nullable= true)
   private String teachSector;
 
   @Column(nullable= true)
   private float averageRating;
 
   @Column(nullable= true, columnDefinition = "default true")
   private boolean activeCanTeach;
 
   // 새로 사용
}
