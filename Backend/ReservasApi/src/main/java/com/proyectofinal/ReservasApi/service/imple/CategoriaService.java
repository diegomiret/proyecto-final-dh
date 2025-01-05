package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.repository.ICategoriaRepository;
import com.proyectofinal.ReservasApi.repository.IImagenRepository;
import com.proyectofinal.ReservasApi.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService implements ICategoriaService {

    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Override
    public List<Categoria> obtenerTodasLasCategorias() {
        return categoriaRepository.findAll();
    }

}
