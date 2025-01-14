package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.Caracteristica;
import com.proyectofinal.ReservasApi.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IcaracteristicaRepository extends JpaRepository<Caracteristica, Integer> {


}
