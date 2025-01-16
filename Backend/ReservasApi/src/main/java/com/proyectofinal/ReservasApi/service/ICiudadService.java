package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.DTO.CategoriaResponseDTO;
import com.proyectofinal.ReservasApi.model.Ciudad;

import java.util.List;

public interface ICiudadService {
    List<Ciudad> obtenerTodasLasCiudades();
}
