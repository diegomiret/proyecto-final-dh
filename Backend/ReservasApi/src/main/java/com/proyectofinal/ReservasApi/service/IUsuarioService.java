package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.model.Usuario;

import java.util.Optional;

public interface IUsuarioService {
    public Usuario crearUsuario(Usuario usuario);

    public Optional<Usuario> buscarUsuarioPorEmail(String email);

    public Usuario obtenerUsuarioActual();
}
