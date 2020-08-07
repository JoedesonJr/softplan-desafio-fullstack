package com.softplan.desafio.api.service;

import com.softplan.desafio.api.model.Process;
import com.softplan.desafio.api.repository.ProcessRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProcessService {

    private final ProcessRepository repository;

    public ProcessService(ProcessRepository repository) {
        this.repository = repository;
    }

    public List<Process> findAll() {
        return repository.findAll();
    }

    public Optional<Process> findById(Long id) {
        return repository.findById(id);
    }

    public Process save(Process process) {
        return repository.save(process);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

}
