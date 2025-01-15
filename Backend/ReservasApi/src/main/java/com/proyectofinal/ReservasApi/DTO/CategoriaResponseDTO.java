package com.proyectofinal.ReservasApi.DTO;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoriaResponseDTO {

    private Integer id;

    private String nombre;

    private String urlImagen;

    private String descripcion;

    private Integer cantidad;

}
