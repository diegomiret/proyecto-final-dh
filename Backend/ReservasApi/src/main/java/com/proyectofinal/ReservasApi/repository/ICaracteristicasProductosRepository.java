package com.proyectofinal.ReservasApi.repository;

import com.proyectofinal.ReservasApi.model.CaracteristicasProductos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICaracteristicasProductosRepository extends JpaRepository<CaracteristicasProductos, Integer>  {

    void deleteAllByIdProducto(int idProducto);

    void deleteAllByIdCaracteristica(int idCaracteristica);

}