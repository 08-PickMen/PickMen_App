package com.pickmen.backend.dto;

import com.pickmen.backend.user.model.School;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SchoolDto {
	private Long id;
	private String name;

	public static SchoolDto fromEntity(School school) {
		return SchoolDto.builder()
				.id(school.getId())
				.name(school.getName())
				.build();
	}
}
