package com.pickmen.backend.user.repository;

import java.util.Optional;

import com.pickmen.backend.user.controller.model.Advertisement;
import com.pickmen.backend.user.controller.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
}
