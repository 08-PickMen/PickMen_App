package com.pickmen.backend.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pickmen.backend.category.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

}
