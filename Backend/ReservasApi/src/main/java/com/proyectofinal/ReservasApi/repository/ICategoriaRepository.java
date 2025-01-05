package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoriaRepository extends JpaRepository<Categoria, Integer> {

}
