package com.pickmen.backend.dto;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.http.HttpStatus;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Accessors(chain = true)
public class ResponseDto<T> {

  int status;
  T data;
}
