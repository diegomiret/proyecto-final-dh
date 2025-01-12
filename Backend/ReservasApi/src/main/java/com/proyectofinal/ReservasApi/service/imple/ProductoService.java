package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.exception.ResourceNotFoundException;
import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.model.Imagen;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.repository.IImagenRepository;
import com.proyectofinal.ReservasApi.repository.IProductoRepository;
import com.proyectofinal.ReservasApi.service.ICategoriaService;
import com.proyectofinal.ReservasApi.service.IProductoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService implements IProductoService {

    @Autowired
    private IProductoRepository productoRepository;

    @Autowired
    private ICategoriaService categoriaService;

    @Autowired
    private ImagenService imagenService;

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

    @Override
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @Override
    public void eliminarProducto(int id) throws ResourceNotFoundException {
        Optional<Producto> productoBuscado = buscarProductoPorId(id);

        if (productoBuscado.isPresent()) {
            productoRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("No existe el producto con id: " + id);
        }

    }

    @Transactional
    public Producto actualizarProducto(Producto producto) {
        // Obtener el producto actual
        Producto productoExistente = productoRepository.findById(producto.getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Actualizar atributos principales
        productoExistente.setTitulo(producto.getTitulo());
        productoExistente.setDescripcion(producto.getDescripcion());
        productoExistente.setCategoria(producto.getCategoria());

        // Eliminar imágenes existentes
        for (Imagen imagen : productoExistente.getImagenes()) {
            imagenService.eliminarImagenPorId(imagen.getId());
        }

        // Asignar nueva lista de imágenes
        productoExistente.setImagenes(producto.getImagenes());

        // Guardar y devolver producto actualizado
        return productoRepository.save(productoExistente);
    }

    @Override
    public Producto actualizarCategoriaProducto(Integer idProducto, Integer idCategoria) {
        // Buscar el producto por ID
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado con ID: " + idProducto));

        // Buscar la categoría por ID
        Categoria categoria = categoriaService.obtenerCategoriaPorId(idCategoria)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada con ID: " + idCategoria));

        // Actualizar la categoría del producto
        producto.setCategoria(categoria);

        // Guardar el producto actualizado
        return productoRepository.save(producto);
    }


}
