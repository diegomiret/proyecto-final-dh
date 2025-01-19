package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Politica;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.repository.IPoliticaRepository;
import com.proyectofinal.ReservasApi.service.IPoliticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicitcaService implements IPoliticaService {

    @Autowired
    private IPoliticaRepository politicaRepository;

    @Override
    public void eliminarPolitica(Integer idPolitica) {
        politicaRepository.deleteById(idPolitica);
    }

    @Override
    public List<Politica> obtenerPoliticasDelProducto(Integer idProducto) {
        Producto producto = new Producto();
        producto.setId(idProducto);
        return politicaRepository.findPoliticasByProducto(producto);
    }

    @Override
    public void eliminarpoliticasDelProductoId(int idProducto) {
        Producto producto = new Producto();
        producto.setId(idProducto);
        politicaRepository.deleteByProducto(producto);
    }

    @Override
    public Politica crearPolitica(Politica politica) {
        return politicaRepository.save(politica);
    }
}
