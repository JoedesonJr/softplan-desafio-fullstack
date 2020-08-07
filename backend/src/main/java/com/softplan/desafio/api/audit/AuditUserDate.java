package com.softplan.desafio.api.audit;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class AuditUserDate extends AuditDate {

    @CreatedBy
    @Column(name = "created_by")
    private String createdBy;

}
