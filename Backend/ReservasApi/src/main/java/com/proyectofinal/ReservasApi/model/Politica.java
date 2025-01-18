package com.proyectofinal.ReservasApi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="politicas")
@Getter
@Setter
public class Politica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;


    @Column(name="titulo")
    private String titulo;

    @Column(name="detalle")
    private String detalle;

    @ManyToOne
    @JoinColumn(name="producto_id")
    private Producto producto;
}
