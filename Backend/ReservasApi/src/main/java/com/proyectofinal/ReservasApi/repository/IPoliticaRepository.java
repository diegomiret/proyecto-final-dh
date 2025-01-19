package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.Favorito;
import com.proyectofinal.ReservasApi.model.Politica;
import com.proyectofinal.ReservasApi.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPoliticaRepository extends JpaRepository<Politica, Integer> {

    List<Politica> findPoliticasByProducto(Producto producto);

    void deleteByProducto(Producto producto);

}
