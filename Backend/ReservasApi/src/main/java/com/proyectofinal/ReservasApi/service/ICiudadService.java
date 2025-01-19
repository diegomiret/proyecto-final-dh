package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.DTO.CategoriaResponseDTO;
import com.proyectofinal.ReservasApi.model.Ciudad;

import java.util.List;
import java.util.Optional;

public interface ICiudadService {
    List<Ciudad> obtenerTodasLasCiudades();

    public Optional<Ciudad> obtenerCiudadId(int idCiudad);
}
