package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.model.Ciudad;
import com.proyectofinal.ReservasApi.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Integer> {

    @Procedure("ProductosAleatorios")
    List<Producto> obtenerProductosAleatorios();

    List<Producto> findByTitulo(String titulo);

    List<Producto> findByCategoria(Categoria categoria);

    List<Producto> findByCiudad(Ciudad ciudad);

    @Query(value = """
    SELECT prod.*
    FROM productos prod
    LEFT JOIN (
        SELECT DISTINCT res.producto_id
        FROM reservas res
        WHERE NOT (res.fecha_fin < :fecha_inicio OR res.fecha_inicio > :fecha_fin)
    ) AS conflictivos ON prod.id = conflictivos.producto_id
    WHERE conflictivos.producto_id IS NULL
    AND prod.id_ciudad = :ciudadId
    """, nativeQuery = true)
    List<Producto> findByCiudadFecha(Integer ciudadId, Date fecha_inicio, Date fecha_fin);

    public void deleteByCategoria(Categoria categoria);
}
