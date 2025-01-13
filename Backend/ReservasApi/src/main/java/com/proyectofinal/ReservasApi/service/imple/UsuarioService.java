package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Role;
import com.proyectofinal.ReservasApi.model.Usuario;
import com.proyectofinal.ReservasApi.repository.IUsuarioRepository;
import com.proyectofinal.ReservasApi.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
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
    public Optional<Usuario> buscarUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    @Override
    public Usuario obtenerUsuarioActual() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null; // No hay usuario autenticcado
        }

        Object principal = authentication.getPrincipal();

        String nombreUsuario;
        if (principal instanceof UserDetails) {
            nombreUsuario = ((UserDetails) principal).getUsername();
        } else {
            nombreUsuario = principal.toString();
        }

        // Buscar el usuario en la base de datos
        return usuarioRepository.findByEmail(nombreUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + nombreUsuario));

    }

    @Override
    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<Usuario> obtenerUsuarioPorId(Integer id) {
        return usuarioRepository.findById(id);
    }


    @Transactional
    public Usuario actualizarRole(Integer id, Role nuevoRole) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + id));

        usuario.setRole(nuevoRole); // Actualiza el atributo
        return usuarioRepository.save(usuario); // Guarda los cambios en la base de datos
    }

}
