package com.softplan.desafio.api.controller;

import com.softplan.desafio.api.model.Process;
import com.softplan.desafio.api.model.User;
import com.softplan.desafio.api.service.ProcessService;
import com.softplan.desafio.api.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/process")
public class ProcessController {

    final ProcessService service;
    final UserService userService;

    public ProcessController(ProcessService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @GetMapping
    public List<Process> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Process> findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public Process save(@Valid @RequestBody Process process) {
        return service.save(process);
    }

    @GetMapping("/users/finishers")
    public List<User> findAllUsersFinishers() {
        return userService.findAllUsersFinishers();
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable Long id) {
        service.deleteById(id);
    }

}
