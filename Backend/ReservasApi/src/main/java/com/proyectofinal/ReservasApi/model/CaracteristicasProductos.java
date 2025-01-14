package com.proyectofinal.ReservasApi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="caracteristicas_productos")
@Getter
@Setter
public class CaracteristicasProductos {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="caracteristica_id")
    private Integer idCaracteristica;

    @Column(name="producto_id")
    private Integer idProducto;
}
