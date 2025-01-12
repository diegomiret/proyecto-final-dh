package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.model.Usuario;

public interface IUsuarioService {
    public Usuario crearUsuario(Usuario usuario);

    public Usuario buscarUsuarioPorEmail(String email);
}
