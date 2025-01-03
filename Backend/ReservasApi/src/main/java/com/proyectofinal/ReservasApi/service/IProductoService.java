package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.model.Producto;

import java.util.Collection;
import java.util.List;

public interface IProductoService {

    public Collection<Producto> listaProductosAleatorios();

    public Producto crearProducto(Producto producto);
}
