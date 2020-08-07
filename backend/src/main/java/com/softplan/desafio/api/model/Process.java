package com.softplan.desafio.api.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.softplan.desafio.api.audit.AuditUserDate;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
@Table(name = "process")
public class Process extends AuditUserDate {

    private Long id;
    private String title;
    private String description;
    private List<User> assignTo;
    private List<Opinion> opinions;

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    @NotNull
    @Length(min = 3, max = 100)
    @Column(nullable = false, length = 100)
    public String getTitle() {
        return title;
    }

    @Column(columnDefinition = "TEXT")
    public String getDescription() {
        return description;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_process",
        joinColumns = @JoinColumn(name = "process_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    public List<User> getAssignTo() {
        return assignTo;
    }

    @OneToMany(mappedBy = "process", cascade = CascadeType.ALL)
    @JsonManagedReference
    public List<Opinion> getOpinions() {
        return opinions;
    }

}
