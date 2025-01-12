package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.model.Categoria;

import java.util.List;
import java.util.Optional;

public interface ICategoriaService {

    List<Categoria> obtenerTodasLasCategorias();

    Optional<Categoria> obtenerCategoriaPorId(int id);
}
