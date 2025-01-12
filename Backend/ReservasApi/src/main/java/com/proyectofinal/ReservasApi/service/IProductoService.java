package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.exception.ResourceNotFoundException;
import com.proyectofinal.ReservasApi.model.Producto;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface IProductoService {

    public Collection<Producto> listaProductosAleatorios();

    public Producto crearProducto(Producto producto);

    public List<Producto> buscarProductoPorTitulo(String titulo);

    public Optional<Producto> buscarProductoPorId(int id);

    public List<Producto> buscarPorductosPorIdCategoria(int idCategoria);

    public List<Producto> listarProductos();

    public void eliminarProducto(int id) throws ResourceNotFoundException;

    public Producto actualizarProducto(Producto producto);

    public Producto actualizarCategoriaProducto(Integer idProducto, Integer idCategoria);
}
