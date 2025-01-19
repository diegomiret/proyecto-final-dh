package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.model.Imagen;
import com.proyectofinal.ReservasApi.model.Politica;
import com.proyectofinal.ReservasApi.service.IImagenService;
import com.proyectofinal.ReservasApi.service.IPoliticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/politicas")
public class PoliticaController {

    @Autowired
    private IPoliticaService politicaService;


    @PostMapping
    public ResponseEntity<Politica> crearPolitica(@RequestBody Politica politica) {
        return ResponseEntity.ok(politicaService.crearPolitica(politica));
    }
}
