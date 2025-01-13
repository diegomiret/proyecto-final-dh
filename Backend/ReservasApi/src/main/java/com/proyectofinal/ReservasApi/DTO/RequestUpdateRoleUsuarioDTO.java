package com.proyectofinal.ReservasApi.DTO;

import com.proyectofinal.ReservasApi.model.Role;
import org.antlr.v4.runtime.misc.NotNull;

public class RequestUpdateRoleUsuarioDTO {

    private Role role;

    // Getters y setters
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
