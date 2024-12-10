package com.example.Entries_Project.model.dto.entry;

import com.example.Entries_Project.model.domain.User;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class EntryResponse {
    private String author;
    private Long id;
    private String tittle;
    private String summary;
    private LocalDate date;
    private List<String> images;
}
