package com.proyectofinal.ReservasApi.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.proyectofinal.ReservasApi.model.Role;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

public class UsuarioResponseDTO {

    private Integer id;

    private String nombre;

    private String apellido;

    private String email;

    private Role role;



}
