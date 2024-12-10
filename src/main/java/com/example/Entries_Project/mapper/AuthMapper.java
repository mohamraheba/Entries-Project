package com.example.Entries_Project.mapper;


import com.example.Entries_Project.model.domain.User;
import com.example.Entries_Project.model.dto.auth.AuthRegisterRequest;
import com.example.Entries_Project.model.dto.auth.AuthResponse;

public interface AuthMapper {
    AuthResponse toResponse(User user, String token);
    User toUser(AuthRegisterRequest request, User user);
}
