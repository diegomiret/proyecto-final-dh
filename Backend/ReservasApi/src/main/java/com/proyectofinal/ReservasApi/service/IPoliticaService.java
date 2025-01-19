package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.model.Politica;

import java.util.List;

public interface IPoliticaService
{
    public void eliminarPolitica(Integer idPolitica);

    public List<Politica> obtenerPoliticasDelProducto(Integer idProducto);

    public void eliminarpoliticasDelProductoId(int idProducto);

    public Politica crearPolitica(Politica politica);
}
