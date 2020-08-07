package com.softplan.desafio.api.model;

import com.softplan.desafio.api.audit.AuditUserDate;
import com.softplan.desafio.api.model.enums.RoleType;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "users")
public class User extends AuditUserDate {

    private Long id;
    private String name;
    private String username;
    private String password;
    private RoleType role;
    private String token;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    @NotNull
    @Length(min = 3, max = 100)
    @Column(nullable = false, length = 100)
    public String getName() {
        return name;
    }

    @NotNull
    @Length(min = 3, max = 20)
    @Column(unique = true, nullable = false, length = 20)
    public String getUsername() {
        return username;
    }

    @NotNull
    @Column(nullable = false)
    public String getPassword() {
        return password;
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    public RoleType getRole() {
        return role;
    }

    @Transient
    public String getToken() {
        return token;
    }

}
