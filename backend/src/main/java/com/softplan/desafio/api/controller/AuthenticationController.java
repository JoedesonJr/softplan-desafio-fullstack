package com.softplan.desafio.api.controller;

import com.softplan.desafio.api.model.User;
import com.softplan.desafio.api.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService service;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(AuthenticationService service, AuthenticationManager authenticationManager) {
        this.service = service;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping
    public User signIn(@RequestBody User user, HttpServletResponse response) throws IOException {
        try {
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            Authentication authentication = authenticationManager.authenticate(auth);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return service.findAuthenticatedUser(user.getUsername());
        } catch (Exception ex) {
            response.sendError(HttpStatus.FORBIDDEN.value(), ex.getMessage());
            ex.printStackTrace();
        }
        return null;
    }

}
