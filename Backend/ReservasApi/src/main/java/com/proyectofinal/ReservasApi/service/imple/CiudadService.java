package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Ciudad;
import com.proyectofinal.ReservasApi.repository.ICiudadrepository;
import com.proyectofinal.ReservasApi.service.ICiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CiudadService implements ICiudadService {

    @Autowired
    private ICiudadrepository ciudadrepository;

    @Override
    public List<Ciudad> obtenerTodasLasCiudades() {
        return ciudadrepository.findAll();
    }
}
