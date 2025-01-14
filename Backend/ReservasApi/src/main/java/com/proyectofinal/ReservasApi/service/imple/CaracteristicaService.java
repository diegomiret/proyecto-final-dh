package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Caracteristica;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.repository.ICaracteristicasProductosRepository;
import com.proyectofinal.ReservasApi.repository.IcaracteristicaRepository;
import com.proyectofinal.ReservasApi.service.ICaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService implements ICaracteristicaService {

    @Autowired
    private IcaracteristicaRepository caracteristicaRepository;

    @Autowired
    private ICaracteristicasProductosRepository caracteristicasProductosRepository;

    @Override
    public List<Caracteristica> listarCaracteristicas() {
        return caracteristicaRepository.findAll();
    }

    @Override
    @Transactional
    public void eliminarCaracteristica(int id) {

        //  borro las caracteristicas asignadas a los productos
        caracteristicasProductosRepository.deleteAllByIdCaracteristica(id);

        caracteristicaRepository.deleteById(id);
    }

    @Override
    public Caracteristica crearCaracteristica(Caracteristica caracteristica) {
        return caracteristicaRepository.save(caracteristica);
    }

    @Override
    public Optional<Caracteristica> obtenerCaracteristica(int id) {
        return caracteristicaRepository.findById(id);
    }

    @Override
    public Caracteristica actualizarCaracteristica(Caracteristica caracteristica) {
        // Obtener el caracteristica actual
        Caracteristica caracteristicaExistente = caracteristicaRepository.findById(caracteristica.getId())
                .orElseThrow(() -> new RuntimeException("Caracteristica no encontrada"));

        return caracteristicaRepository.save(caracteristica);
    }
}
