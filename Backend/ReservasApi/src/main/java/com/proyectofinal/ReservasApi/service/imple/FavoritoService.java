package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Favorito;
import com.proyectofinal.ReservasApi.repository.IFavoritoRepository;
import com.proyectofinal.ReservasApi.repository.IReservaRepository;
import com.proyectofinal.ReservasApi.service.IFavoritoService;
import com.proyectofinal.ReservasApi.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritoService implements IFavoritoService {

    @Autowired
    private IFavoritoRepository favoritoRepository;

    public List<Favorito> obtenerFavoritosDelUsuarioId(Integer idUsuario){
        return favoritoRepository.findByIdUsuario(idUsuario);
    }

    @Override
    public List<Favorito> obtenerFavoritosDelProductoId(Integer idProducto) {
        return favoritoRepository.findByIdProducto(idProducto);
    }

    @Override
    public void eliminarFavorito(Integer idFavorito) {
        Favorito favorito = new Favorito();
        favorito.setId(idFavorito);
        favoritoRepository.delete(favorito);
    }

    @Override
    public Favorito crearFavorito(Favorito favorito) {
        return favoritoRepository.save(favorito);
    }
}
