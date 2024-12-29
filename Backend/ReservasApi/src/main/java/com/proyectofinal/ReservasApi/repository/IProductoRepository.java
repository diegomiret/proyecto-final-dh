package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Integer> {

    @Procedure("ProductosAleatorios")
    List<Producto> obtenerProductosAleatorios();
}
