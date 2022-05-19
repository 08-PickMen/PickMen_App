package com.pickmen.backend.user.repository;

import com.pickmen.backend.user.model.Advertisement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
}
