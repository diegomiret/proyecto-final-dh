package com.proyectofinal.ReservasApi.controller;


import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.model.Rol;
import com.proyectofinal.ReservasApi.model.Usuario;
import com.proyectofinal.ReservasApi.model.constantes.RolesGlobales;
import com.proyectofinal.ReservasApi.service.imple.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    //@Autowired
    //private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {

        Usuario usuarioBuscado = usuarioService.buscarUsuarioPorEmail(usuario.getEmail());

        if (usuarioBuscado!= null) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Ya se usó el email " + usuario.getEmail());
        }

        //usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        // creo el rol
        Rol rol = new Rol();
        rol.setId(RolesGlobales.ROL_USER);

        usuario.setEstado(false);
        usuario.setRol(rol);
        Usuario resultado = usuarioService.crearUsuario(usuario);


        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Usuario creado con éxito");
    }

}
