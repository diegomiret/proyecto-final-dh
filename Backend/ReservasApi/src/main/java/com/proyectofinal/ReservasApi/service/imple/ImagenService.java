package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Imagen;
import com.proyectofinal.ReservasApi.repository.IImagenRepository;
import com.proyectofinal.ReservasApi.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImagenService implements IImagenService {

    @Autowired
    private IImagenRepository imagenRepository;

    @Override
    public Imagen crearImagen(Imagen imagen) {
        return imagenRepository.save(imagen);
    }
}
