package com.softplan.desafio.api.repository;

import com.softplan.desafio.api.model.User;
import com.softplan.desafio.api.model.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAllByRole(RoleType roleType);

    User findUserByUsername(String username);

}