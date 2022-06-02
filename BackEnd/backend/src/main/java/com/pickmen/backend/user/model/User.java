package com.pickmen.backend.user.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.pickmen.backend.RoleType;
import com.pickmen.backend.chat.model.ChatRoom;
import com.pickmen.backend.chat.model.UserChatRoom;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// ORM -> 오브젝트를 테이블로 매핑해주는 역할
// JPA 는 Java의 ORM

@Table(name = "user")
@Data
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
    
   @JsonManagedReference(value = "user-userchatRoom")
   @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
   private List<UserChatRoom> userChatRooms = new ArrayList<>();

   @Column(nullable= true)
   private String nickname;
   
   // 전공 입력 추가(프론트에서 리스트에서 선택하여 전달해주는 식으로)
   @JsonBackReference(value = "major-user")
   @ManyToOne
   @JoinColumn(name = "majorId")
   private Major major;

   
   // 관심 강의 입력 추가(프론트에서 전달해줌)
   // User와 N : N 관계지만 UserLecture을 두어 (User)1:N (UserLecture) N:1(Lecture)
   @JsonManagedReference(value = "user-userLecture")
   @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
   private List<UserLecture> userLectures = new ArrayList<>();
 
   // 학교 입력 추가(프론트에서 리스트에서 선택하여 전달해주는 식으로)
   @JsonBackReference(value = "school-user")
   @ManyToOne
   @JoinColumn(name = "schoolId")
   private School school;

   @Column(nullable= true)
   private String profileImage;
   
   // "멘토" 에만 추가되는 부분들
   @Column(nullable= true)
   private String reportCard;
 
   @Column(nullable= true)
   private float averageRating;
 
   @Column(nullable= true)
   private boolean activeCanTeach;
   
   // 멘토 자기소개 멘트 입력
   @Column(nullable= true)
   private String introduceMyself;
   
   // 멘토 거주지 입력
   @Column(nullable= true)
   private String livingWhere;
   
   // 멘토링 내용 입력
   @Column(nullable= true)
   private String mentoringContents;
 
   // 멘토링 후기
   @JsonManagedReference(value = "review-user")
   @OneToMany(mappedBy = "mentor", cascade = CascadeType.ALL)
   private List<Review> reviews = new ArrayList<>(); 
}
