package com.proyectofinal.ReservasApi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="imagenes")
@Getter
@Setter
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="titulo")
    private String titulo;

    @Column(name="url")
    private String url;

    @JsonIncludeProperties(value = {"id"})
    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id")
    private Producto producto;

}
