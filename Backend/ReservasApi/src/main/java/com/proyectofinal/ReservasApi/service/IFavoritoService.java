package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.model.Favorito;

import java.util.List;

public interface IFavoritoService {

    public List<Favorito> obtenerFavoritosDelUsuarioId(Integer idUsuario);

    public void eliminarFavorito(Integer idFavorito);

    public Favorito crearFavorito(Favorito favorito);
}
