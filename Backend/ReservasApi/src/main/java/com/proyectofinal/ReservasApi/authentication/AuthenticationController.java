package com.proyectofinal.ReservasApi.authentication;

import com.proyectofinal.ReservasApi.DTO.AuthenticationRequest;
import com.proyectofinal.ReservasApi.DTO.AuthenticationResponse;
import com.proyectofinal.ReservasApi.DTO.RegisterRequest;
import com.proyectofinal.ReservasApi.service.IUsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    private IUsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<?> register (
            @RequestBody RegisterRequest request) {

        String  emailLimpio = request.getEmail().toUpperCase().trim();
        if (usuarioService.buscarUsuarioPorEmail(emailLimpio).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Ya está registrado el email " + emailLimpio);
        }

        request.setEmail(emailLimpio);
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login (
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

}
