package com.softplan.desafio.api.controller;

import com.softplan.desafio.api.model.dto.ProcessOpinionDTO;
import com.softplan.desafio.api.service.ProcessOpinionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/process-opinion")
public class ProcessOpinionController {

    final ProcessOpinionService service;

    public ProcessOpinionController(ProcessOpinionService service) {
        this.service = service;
    }

    @PostMapping
    public void save(@RequestBody ProcessOpinionDTO dto) {
        service.save(dto);
    }

    @GetMapping
    public List<ProcessOpinionDTO> findAllProcessOpinionToUser() {
        return service.findAllProcessOpinionToUser();
    }

}
