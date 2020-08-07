package com.softplan.desafio.api.service;

import com.softplan.desafio.api.model.User;
import com.softplan.desafio.api.model.enums.RoleType;
import com.softplan.desafio.api.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    public User findUserByUsername(String username) {
        return repository.findUserByUsername(username);
    }

    public List<User> findAllUsersFinishers() {
        return repository.findAllByRole(RoleType.ROLE_FINISHER);
    }

    public User save(User user) throws Exception {
        try {
            if (user.getId() != null) {
                user.setPassword(restorePassword(user.getId()));
            } else {
                user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            }
            return repository.save(user);
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("Já existe um usuário com este login.");
        }
    }

    private String restorePassword(Long id) throws Exception {
        Optional<User> current = repository.findById(id);
        if (current.isPresent()) {
            return current.get().getPassword();
        }
        throw new Exception("Usuário não encontrado");
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

}
