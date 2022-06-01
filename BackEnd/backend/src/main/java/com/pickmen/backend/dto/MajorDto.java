package com.pickmen.backend.dto;

import com.pickmen.backend.user.model.Major;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MajorDto {

	private Long id;
	private String name;
	
	public static MajorDto fromEntity(Major major) {
		return MajorDto.builder()
				.id(major.getId())
				.name(major.getName())
				.build();		
	}
}
