package com.softplan.desafio.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.softplan.desafio.api.audit.AuditDate;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "opinion")
public class Opinion extends AuditDate {

    private Long id;
    private User author;
    private Process process;
    private String text;

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    public User getAuthor() {
        return author;
    }

    @ManyToOne
    @JoinColumn(name = "process_id", nullable = false)
    @JsonBackReference
    public Process getProcess() {
        return process;
    }

    @NotNull
    @Column(nullable = false, columnDefinition = "TEXT")
    public String getText() {
        return text;
    }

}
