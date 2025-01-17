package com.proyectofinal.ReservasApi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Favoritos")
@Getter
@Setter
public class Favorito
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;

    @Column(name="id_producto")
    private Integer idProducto;

    @Column(name="id_usuario")
    private Integer idUsuario;

}
