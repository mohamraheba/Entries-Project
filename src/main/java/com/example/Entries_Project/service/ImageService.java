package com.example.Entries_Project.service;

import com.example.Entries_Project.model.domain.Entry;
import com.example.Entries_Project.model.domain.Image;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    Image save(MultipartFile image, Entry entry);
    void delete(String filename);
}
