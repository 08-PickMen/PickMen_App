package com.pickmen.backend.dto;

import java.util.List;

import com.pickmen.backend.user.model.UserLecture;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class detailDto {
    private String schoolName;
    private String majorName;
    private String nickName;
    private long userId;
    private String Email; 
    private List<UserLecture> userLecture;
}
