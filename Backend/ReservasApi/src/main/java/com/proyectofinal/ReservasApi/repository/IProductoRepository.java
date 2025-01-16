package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.model.Ciudad;
import com.proyectofinal.ReservasApi.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Integer> {

    @Procedure("ProductosAleatorios")
    List<Producto> obtenerProductosAleatorios();

    List<Producto> findByTitulo(String titulo);

    List<Producto> findByCategoria(Categoria categoria);

    List<Producto> findByCiudad(Ciudad ciudad);

}
