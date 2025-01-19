package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.DTO.ValoracionPromedioDTO;
import com.proyectofinal.ReservasApi.model.Politica;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByProducto(Producto producto);

    @Query(value = "SELECT r.producto_id AS idProducto, AVG(r.valoracion) AS promedio, COUNT(r.valoracion) AS cantidadValoraciones " +
            "FROM reviews r " +
            "GROUP BY r.producto_id " +
            "ORDER BY AVG(r.valoracion) DESC " +
            "LIMIT :cantidadTop", nativeQuery = true)
    List<ValoracionPromedioDTO> obtenerTopProductosPorValoracion(@Param("cantidadTop") int cantidadTop);

    List<Review> findReviewsByProducto(Producto producto);

}
