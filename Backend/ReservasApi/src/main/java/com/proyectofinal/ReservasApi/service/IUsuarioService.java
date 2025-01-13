package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.model.Role;
import com.proyectofinal.ReservasApi.model.Usuario;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface IUsuarioService {
    public Usuario crearUsuario(Usuario usuario);

    public Optional<Usuario> buscarUsuarioPorEmail(String email);

    public Usuario obtenerUsuarioActual();

    public List<Usuario> obtenerTodosLosUsuarios();

    public Optional<Usuario> obtenerUsuarioPorId(Integer id);

    @Transactional
    public Usuario actualizarRole(Integer id, Role nuevoRole);
}
