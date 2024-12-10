package com.example.Entries_Project.model.dto.auth;

import lombok.Data;

@Data
public class AuthLoginRequest {
    private String name;
    private String email;
    private String password;
}
