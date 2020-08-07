package com.softplan.desafio.api.service;

import com.softplan.desafio.api.model.User;
import com.softplan.desafio.api.repository.UserRepository;
import com.softplan.desafio.api.security.JwtUtils;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final JwtUtils jwtUtils;

    public AuthenticationService(UserRepository repository, JwtUtils jwtUtils) {
        this.repository = repository;
        this.jwtUtils = jwtUtils;
    }

    public User findUserByUsername(String username) {
        return repository.findUserByUsername(username);
    }

    public User findAuthenticatedUser(String username) {
        User user = findUserByUsername(username);
             user.setToken(jwtUtils.generateToken(user));
             user.setPassword(null);
        return user;
    }

}