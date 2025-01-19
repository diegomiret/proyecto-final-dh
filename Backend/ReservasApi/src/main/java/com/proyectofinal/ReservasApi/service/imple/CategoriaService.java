package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.DTO.CategoriaResponseDTO;
import com.proyectofinal.ReservasApi.exception.ResourceNotFoundException;
import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.model.Imagen;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.repository.ICategoriaRepository;
import com.proyectofinal.ReservasApi.repository.IImagenRepository;
import com.proyectofinal.ReservasApi.repository.IProductoRepository;
import com.proyectofinal.ReservasApi.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService implements ICategoriaService {

    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Autowired
    private ProductoService productoService;

    @Autowired
    private FavoritoService favoritoService;

    @Override
    public List<CategoriaResponseDTO> obtenerTodasLasCategorias() {

        List<Categoria> categorias = categoriaRepository.findAll();
        List<CategoriaResponseDTO> listaCategoriasDTO = new ArrayList<>();

        for (Categoria categoria : categorias) {
            Integer cantidad = productoService.obtenerCantidadPorCategoria(categoria.getId());
            CategoriaResponseDTO categoriaDTO = new CategoriaResponseDTO();
            categoriaDTO.setId(categoria.getId());
            categoriaDTO.setNombre(categoria.getNombre());
            categoriaDTO.setCantidad(cantidad);
            categoriaDTO.setUrlImagen(categoria.getUrlImagen());
            categoriaDTO.setDescripcion(categoria.getDescripcion());

            listaCategoriasDTO.add(categoriaDTO);
        }

        return listaCategoriasDTO;

        //return categoriaRepository.findAll();
    }

    @Override
    public Optional<Categoria> obtenerCategoriaPorId(int id) {
        return categoriaRepository.findById(id);
    }

    @Override
    public Categoria crearCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public void eliminarCategoria(int idCategoria) throws ResourceNotFoundException {


        List<Producto> productosAborrar = productoService.buscarPorductosPorIdCategoria(idCategoria);
        //  Elimino los productos asociados a la categoria
        for (Producto producto : productosAborrar) {
            productoService.eliminarProducto(producto.getId());
        }

        Categoria categoria = new Categoria();
        categoria.setId(idCategoria);
        categoriaRepository.delete(categoria);
    }

}
