package com.proyectofinal.ReservasApi.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(name = "estado")
    private Boolean estado;

    @ManyToOne(optional = false, cascade = {CascadeType.REFRESH})
    @JoinColumn(name = "id_rol", nullable = false)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Rol rol;

}