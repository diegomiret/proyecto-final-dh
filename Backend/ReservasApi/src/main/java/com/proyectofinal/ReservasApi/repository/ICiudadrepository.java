package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.model.Ciudad;
import com.proyectofinal.ReservasApi.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICiudadrepository extends JpaRepository<Ciudad, Integer> {

}
