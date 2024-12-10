package com.example.Entries_Project.mapper;

import com.example.Entries_Project.model.domain.Entry;
import com.example.Entries_Project.model.domain.Image;
import com.example.Entries_Project.model.dto.entry.EntryRequest;
import com.example.Entries_Project.model.dto.entry.EntryResponse;

import java.util.List;

public interface EntryMapper {
    Entry toEntry(EntryRequest request, Entry entry);
    EntryResponse toResponse(Entry entry);
    List<EntryResponse> toResponseList(List<Entry> entries);
}
