package com.softplan.desafio.api.repository;

import com.softplan.desafio.api.model.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessOpinionRepository extends JpaRepository<Opinion, Long> {

    Opinion findOpinionByProcessIdAndAuthorId(Long processId, Long authorId);

}
