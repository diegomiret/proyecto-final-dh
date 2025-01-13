package com.proyectofinal.ReservasApi.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginRequestDTO {
    private String email;
    private String password;

    public Authentication toUsernamePasswordAuthenticationToken() {
        System.out.println(email);
        System.out.println(password);
        return new UsernamePasswordAuthenticationToken(email, password);
    }

}