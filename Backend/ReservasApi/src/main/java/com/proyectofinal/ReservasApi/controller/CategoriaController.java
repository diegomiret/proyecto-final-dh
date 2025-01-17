package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.DTO.CategoriaResponseDTO;
import com.proyectofinal.ReservasApi.exception.ResourceNotFoundException;
import com.proyectofinal.ReservasApi.model.Caracteristica;
import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.service.ICategoriaService;
import com.proyectofinal.ReservasApi.service.imple.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private ICategoriaService categoriaService;


    @GetMapping
    public ResponseEntity<Collection<CategoriaResponseDTO>> listarTodasLasCategorias() {
        return ResponseEntity.ok(categoriaService.obtenerTodasLasCategorias());
    }

    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria categoria) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoriaService.crearCategoria(categoria));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Integer id) throws ResourceNotFoundException {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.ok("Se eliminó el favorito con id: " + id);
    }
}
