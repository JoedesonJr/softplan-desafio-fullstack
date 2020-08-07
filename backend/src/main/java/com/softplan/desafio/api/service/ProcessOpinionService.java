package com.softplan.desafio.api.service;

import com.softplan.desafio.api.model.Opinion;
import com.softplan.desafio.api.model.Process;
import com.softplan.desafio.api.model.User;
import com.softplan.desafio.api.model.dto.ProcessOpinionDTO;
import com.softplan.desafio.api.repository.ProcessOpinionRepository;
import com.softplan.desafio.api.repository.ProcessRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProcessOpinionService {

    private final ProcessOpinionRepository repository;
    private final ProcessRepository processRepository;
    private final UserService userService;

    public ProcessOpinionService(ProcessOpinionRepository repository, ProcessRepository processRepository, UserService userService) {
        this.processRepository = processRepository;
        this.repository = repository;
        this.userService = userService;
    }

    public void save(ProcessOpinionDTO dto) {
        Process process = processRepository.findById(dto.getProcessId()).get();
        if (dto.getOpinionId() != null) {
            process.getOpinions().forEach(op -> {
                if (op.getId() == dto.getOpinionId()) {
                    op.setText(dto.getText());
                }
            });
        } else {
            Opinion opinion = new Opinion();
            opinion.setProcess(process);
            opinion.setAuthor(userService.findById(dto.getOpinionAuthorId()).get());
            opinion.setText(dto.getText());
            process.getOpinions().add(opinion);
        }
        processRepository.save(process);
    }

    public List<ProcessOpinionDTO> findAllProcessOpinionToUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userService.findUserByUsername(userDetails.getUsername());
        // lista todos os processos do usuário logado, mesmo que não tenha parecer
        List<Process> processes = processRepository.findAllByAssignTo(currentUser);

        List<ProcessOpinionDTO> processOpinion = new ArrayList<>();

        // pra cada processo, verifica se há um parecer associado
        processes.forEach(process -> {
            Opinion opinion = repository.findOpinionByProcessIdAndAuthorId(process.getId(), currentUser.getId());
            if (opinion == null) {
                opinion = new Opinion();
                opinion.setAuthor(currentUser);
                opinion.setText("");
            }
            processOpinion.add(
                ProcessOpinionDTO.builder()
                    .processId(process.getId())
                    .title(process.getTitle())
                    .description(process.getDescription())
                    .processCreatedDate(process.getCreatedDate())
                    .opinionId(opinion.getId())
                    .opinionAuthorId(opinion.getAuthor().getId())
                    .opinionCreatedDate(opinion.getCreatedDate())
                    .text(opinion.getText())
                .build()
            );
        });
        return processOpinion;
    }

}
