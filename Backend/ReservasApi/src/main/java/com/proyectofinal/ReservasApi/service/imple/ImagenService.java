package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Imagen;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.repository.IImagenRepository;
import com.proyectofinal.ReservasApi.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagenService implements IImagenService {

    @Autowired
    private IImagenRepository imagenRepository;

    @Override
    public Imagen crearImagen(Imagen imagen) {
        return imagenRepository.save(imagen);
    }

    @Override
    public List<Imagen> obtenerImaganesDelProductoId(int idProducto) {
        Producto producto = new Producto();
        producto.setId(idProducto);
        return imagenRepository.findByProducto(producto);
    }

}
