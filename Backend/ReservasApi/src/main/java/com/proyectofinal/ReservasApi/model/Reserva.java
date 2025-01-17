package com.proyectofinal.ReservasApi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name="reservas")
@Getter
@Setter
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fecha_inicio")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date fecha_inicio;

    @Column(name = "fecha_fin")
    private Date fecha_fin;

    @Column(name = "fecha_reserva")
    private Date fecha_reserva;

    @ManyToOne
    @JoinColumn(name="producto_id")
    private Producto producto;
    @ManyToOne
    @JoinColumn(name="usuario_id")
    private Usuario usuario;
}
