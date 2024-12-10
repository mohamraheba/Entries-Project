package com.example.Entries_Project.repository;

import com.example.Entries_Project.model.domain.Image;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    @Transactional
    void deleteByName(String filename);
}
