package com.pickmen.backend.user.repository;

import com.pickmen.backend.user.model.Advertisement;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
}
