package com.example.Entries_Project.service;

import com.example.Entries_Project.model.dto.auth.AuthLoginRequest;
import com.example.Entries_Project.model.dto.auth.AuthRegisterRequest;
import com.example.Entries_Project.model.dto.auth.AuthResponse;

public interface AuthService {
    AuthResponse register(AuthRegisterRequest request);
    AuthResponse login(AuthLoginRequest request);
}
