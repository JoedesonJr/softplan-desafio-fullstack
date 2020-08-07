package com.softplan.desafio.api.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ProcessOpinionDTO {

    private Long processId;
    private String title;
    private String description;
    private Date processCreatedDate;

    private Long opinionId;
    private Long opinionAuthorId;
    private Date opinionCreatedDate;
    private String text;

}
