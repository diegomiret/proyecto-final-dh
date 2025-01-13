package com.proyectofinal.ReservasApi.controller;


import com.proyectofinal.ReservasApi.DTO.AuthenticationRequest;
import com.proyectofinal.ReservasApi.DTO.AuthenticationResponse;
import com.proyectofinal.ReservasApi.DTO.RegisterRequest;
import com.proyectofinal.ReservasApi.authentication.AuthenticationService;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.model.Rol;
import com.proyectofinal.ReservasApi.model.Usuario;
import com.proyectofinal.ReservasApi.model.constantes.RolesGlobales;
import com.proyectofinal.ReservasApi.service.IUsuarioService;
import com.proyectofinal.ReservasApi.service.imple.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

@Autowired
    private IUsuarioService usuarioService;

    @GetMapping("/usuarioActual")
    public ResponseEntity<Usuario> obtenerUsuarioActual(@RequestHeader Map<String, String> headers) {

        Usuario usuarioActual = usuarioService.obtenerUsuarioActual();

        //  hasta aca no arrojó excepción

        return ResponseEntity.ok(usuarioActual);
    }

}
