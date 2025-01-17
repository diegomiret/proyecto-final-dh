package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.Imagen;
import com.proyectofinal.ReservasApi.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IReservaRepository extends JpaRepository<Reserva, Integer> {


}
