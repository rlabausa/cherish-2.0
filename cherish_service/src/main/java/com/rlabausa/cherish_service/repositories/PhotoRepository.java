package com.rlabausa.cherish_service.repositories;

import com.rlabausa.cherish_service.models.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
}
