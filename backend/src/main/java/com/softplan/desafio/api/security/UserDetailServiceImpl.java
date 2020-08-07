package com.softplan.desafio.api.security;

import com.softplan.desafio.api.model.User;
import com.softplan.desafio.api.service.AuthenticationService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    final AuthenticationService authenticationService;

    public UserDetailServiceImpl(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = authenticationService.findUserByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("Nenhum usuário encontrado com este login " + username);
        } else {
            return new JwtUser(user);
        }
    }

}