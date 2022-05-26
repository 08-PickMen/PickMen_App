package com.pickmen.backend.user.repository;

import java.util.List;
import java.util.Optional;

import com.pickmen.backend.RoleType;
import com.pickmen.backend.dto.MentorDto;
import com.pickmen.backend.user.model.Major;
import com.pickmen.backend.user.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  // select * from user where username = ? and password ?
  Optional<User> findByUsernameAndPassword(String username, String password);

  Optional<User> findByPassword(String password);
  
  Optional<User> findByUsername(String username);

  List<User> findAllByRole(RoleType role);
  
  List<User> findAllByRoleAndMajor(RoleType role, Major major);

  Optional<User> findByNickname(String nickname);
  
  @Query(value = "select * from user where role = 'MENTOR' and teach_sector like '%:sector%' order by average_rating", nativeQuery = true)
  List<User> MentorFindByTeachSector(@Param("sector")String teachSector);

  @Query(value = "select * from user where role = 'MENTOR' and teach_sector not like '%:sector%' order by average_rating", nativeQuery = true)
  List<User> MentorFindByNotTeachSector(@Param("sector")String teachSector);

  // @Query(value="select * from user where role = MENTOR and and teach_sector not like '%:sector%' ")
  // List<User> MentorFindByMajor(@Param("major")String major,@Param("sector")String teachSector);



  //  @Query(value = "select * from user where username = ? and password ?", nativeQuery = true)
  //  Optional<User> login(String username, String password);
}
