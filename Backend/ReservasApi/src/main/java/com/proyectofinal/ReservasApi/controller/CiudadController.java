package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.DTO.CategoriaResponseDTO;
import com.proyectofinal.ReservasApi.model.Ciudad;
import com.proyectofinal.ReservasApi.service.imple.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/ciudades")
public class CiudadController {

    @Autowired
    private CiudadService ciudadService;

    @GetMapping
    public ResponseEntity<Collection<Ciudad>> listarTodasLasCiudades() {
        return ResponseEntity.ok(ciudadService.obtenerTodasLasCiudades());
    }
}
