package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.repository.ICaracteristicasProductosRepository;
import com.proyectofinal.ReservasApi.service.ICaracteristicasProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CaracteristicasProductosService implements ICaracteristicasProductosService {

    @Autowired
    private ICaracteristicasProductosRepository caracteristicasProductosRepository;

    @Override
    public void eliminarRelacionConIdProducto(int idProducto) {
        caracteristicasProductosRepository.deleteAllByIdProducto(idProducto);
    }

    @Override
    public void eliminarRelacionConIdCaraccteristica(int idCaracteristica) {
        caracteristicasProductosRepository.deleteAllByIdCaracteristica(idCaracteristica);
    }
}
