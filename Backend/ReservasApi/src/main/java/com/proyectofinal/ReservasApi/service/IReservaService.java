package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.model.Reserva;

import java.util.List;

public interface IReservaService {

    public List<Reserva> obtenerTodasLasReservas();
}
