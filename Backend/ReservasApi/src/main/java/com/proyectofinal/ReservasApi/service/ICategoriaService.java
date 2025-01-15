package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.DTO.CategoriaResponseDTO;
import com.proyectofinal.ReservasApi.model.Categoria;

import java.util.List;
import java.util.Optional;

public interface ICategoriaService {

    List<CategoriaResponseDTO> obtenerTodasLasCategorias();

    Optional<Categoria> obtenerCategoriaPorId(int id);

    public Categoria crearCategoria(Categoria categoria);
}
