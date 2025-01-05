package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.repository.IProductoRepository;
import com.proyectofinal.ReservasApi.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService implements IProductoService {

    @Autowired
    private IProductoRepository productoRepository;


    @Override
    public Collection<Producto> listaProductosAleatorios() {
        return productoRepository.obtenerProductosAleatorios();
    }

    @Override
    public Producto crearProducto(Producto producto) {

        return productoRepository.save(producto);
    }

    @Override
    public List<Producto> buscarProductoPorTitulo(String titulo) {
        return productoRepository.findByTitulo(titulo);
    }

    @Override
    public Optional<Producto> buscarProductoPorId(int id) {
        return productoRepository.findById(id);
    }

    @Override
    public List<Producto> buscarPorductosPorIdCategoria(int idCategoria) {
        Categoria categoria = new Categoria();
        categoria.setId(idCategoria);
        return productoRepository.findByCategoria(categoria);
    }


}
