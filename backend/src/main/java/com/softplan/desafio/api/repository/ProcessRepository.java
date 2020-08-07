package com.softplan.desafio.api.repository;

import com.softplan.desafio.api.model.Process;
import com.softplan.desafio.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProcessRepository extends JpaRepository<Process, Long> {

    List<Process> findAllByAssignTo(User user);

}
