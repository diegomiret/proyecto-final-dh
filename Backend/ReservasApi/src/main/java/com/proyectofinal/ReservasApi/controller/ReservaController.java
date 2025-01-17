package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.DTO.CategoriaResponseDTO;
import com.proyectofinal.ReservasApi.model.Reserva;
import com.proyectofinal.ReservasApi.repository.IReservaRepository;
import com.proyectofinal.ReservasApi.service.ICategoriaService;
import com.proyectofinal.ReservasApi.service.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private IReservaService reservaService;


    @GetMapping
    public ResponseEntity<Collection<Reserva>> listarTodasLasCategorias() {
        return ResponseEntity.ok(reservaService.obtenerTodasLasReservas());
    }

}
