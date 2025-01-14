package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.model.Caracteristica;

import java.util.List;
import java.util.Optional;

public interface ICaracteristicaService {

    List<Caracteristica> listarCaracteristicas();

    public void eliminarCaracteristica(int id);

    public Caracteristica crearCaracteristica(Caracteristica caracteristica);

    public Optional<Caracteristica> obtenerCaracteristica(int id);

    public Caracteristica actualizarCaracteristica(Caracteristica caracteristica);
}
