package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.service.ICategoriaService;
import com.proyectofinal.ReservasApi.service.imple.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private ICategoriaService categoriaService;


    @GetMapping
    public ResponseEntity<Collection<Categoria>> listarTodasLasCategorias() {
        return ResponseEntity.ok(categoriaService.obtenerTodasLasCategorias());
    }
}
