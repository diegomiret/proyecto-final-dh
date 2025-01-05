package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.model.Imagen;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.service.IImagenService;
import com.proyectofinal.ReservasApi.service.imple.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/imagenes")
public class ImagenController {

    @Autowired
    private IImagenService imagenService;

    @PostMapping
    public ResponseEntity<Imagen> crearImagen(@RequestBody Imagen imagen) {
        return ResponseEntity.ok(imagenService.crearImagen(imagen));
    }


    @GetMapping("/imagenesDelProducto/{id}")
    public ResponseEntity<Collection<Imagen>> listarImagenesDelProductoId(@PathVariable Integer id) {
        return ResponseEntity.ok(imagenService.obtenerImaganesDelProductoId(id));
    }



}
