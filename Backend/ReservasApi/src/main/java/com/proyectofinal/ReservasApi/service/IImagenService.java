package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.model.Imagen;
import com.proyectofinal.ReservasApi.model.Producto;
import java.util.Collection;
import java.util.List;

public interface IImagenService {

    public Imagen crearImagen(Imagen imagen);

    public List<Imagen> obtenerImaganesDelProductoId(int idProducto);
}
