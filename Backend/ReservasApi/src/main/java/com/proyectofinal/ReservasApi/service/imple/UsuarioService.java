package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Usuario;
import com.proyectofinal.ReservasApi.repository.IUsuarioRepository;
import com.proyectofinal.ReservasApi.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Override
    public Usuario crearUsuario(Usuario usuario) {
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        return usuarioGuardado;
    }

    @Override
    public Usuario buscarUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}
