package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.model.Ciudad;
import com.proyectofinal.ReservasApi.model.Favorito;
import com.proyectofinal.ReservasApi.model.Imagen;
import com.proyectofinal.ReservasApi.service.imple.CiudadService;
import com.proyectofinal.ReservasApi.service.imple.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/favoritos")
public class FavoritoController {


    @Autowired
    private FavoritoService favoritoService;

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Collection<Favorito>> listarFavoritosDelUsuarioId(@PathVariable Integer id) {
        return ResponseEntity.ok(favoritoService.obtenerFavoritosDelUsuarioId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarFavorito(@PathVariable Integer id) {
        favoritoService.eliminarFavorito(id);
        return ResponseEntity.ok("Se eliminó el favorito con id: " + id);
    }


    @PostMapping
    public ResponseEntity<Favorito> crearFavorito(@RequestBody Favorito favorito) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(favoritoService.crearFavorito(favorito));
    }

}
