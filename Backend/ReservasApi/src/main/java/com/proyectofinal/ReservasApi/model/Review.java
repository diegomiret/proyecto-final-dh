package com.proyectofinal.ReservasApi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name="reviews")
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="producto_id")
    @JsonIgnore
    private Producto producto;

    @ManyToOne
    @JoinColumn(name="usuario_id")
    //@JsonIgnore
    private Usuario usuario;


    @Column(name = "valoracion")
    private Integer valoracion;


    @Column(name = "comentario")
    private String comentario;

    @Column(name = "fecha_review")
    private Date fecha_review;


//    @JsonProperty("producto_id")
//    public Integer getProductoId() {
//        return producto != null ? producto.getId() : null;
//    }
}
