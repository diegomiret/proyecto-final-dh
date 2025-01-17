package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.Favorito;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFavoritoRepository extends JpaRepository<Favorito, Integer> {

    List<Favorito> findByIdUsuario(Integer idUsuario);

}
