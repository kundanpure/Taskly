package com.backend.todolist.auth.model;

import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Arrays;
import java.util.List;

@Data
@Entity
@Table(name = "users")  // Explicitly specify the table name as 'users'
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Use GenerationType.IDENTITY for PostgreSQL
    private Long id;

    @NotEmpty(message = "Username is required")
    @Column(unique = true)
    private String username;

    @NotEmpty(message = "Password is required")
    private String password;

    private String role;

    protected User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.role = "User";  // Default role
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoleAsList() {
        return Arrays.asList(this.role);
    }

    public String getRole() {
        return role;
    }

    public void setRoles(String role) {
        this.role = role;
    }
}
