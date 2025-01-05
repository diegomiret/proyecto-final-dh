package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.Imagen;
import com.proyectofinal.ReservasApi.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IImagenRepository extends JpaRepository<Imagen, Integer> {

    //@Query("SELECT c FROM imagenes c WHERE c.producto_id = :idProducto")
    //List<Imagen> findByProducto_id(int idProducto);

    List<Imagen> findByProducto(Producto producto);

}
