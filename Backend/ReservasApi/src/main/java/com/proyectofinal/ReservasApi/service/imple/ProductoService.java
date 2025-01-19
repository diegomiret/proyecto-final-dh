package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.DTO.ReviewDTO;
import com.proyectofinal.ReservasApi.DTO.ValoracionPromedioDTO;
import com.proyectofinal.ReservasApi.exception.ResourceNotFoundException;
import com.proyectofinal.ReservasApi.model.*;
import com.proyectofinal.ReservasApi.repository.*;
import com.proyectofinal.ReservasApi.service.ICaracteristicasProductosService;
import com.proyectofinal.ReservasApi.service.ICategoriaService;
import com.proyectofinal.ReservasApi.service.IProductoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductoService implements IProductoService {

    @Autowired
    private IProductoRepository productoRepository;

    @Autowired
    private ImagenService imagenService;

    @Autowired
    private ICategoriaRepository categoriarepository;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private FavoritoService favoritoService;

    @Autowired
    private PolicitcaService policitcaService;

    @Autowired
    private CiudadService ciudadService;


    //@Autowired
    //private ImagenService imagenService;

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

        //  elimino favoritos
        List<Favorito> favoritos = favoritoService.obtenerFavoritosDelProductoId(id);
        for (Favorito favorito : favoritos) {
            favoritoService.eliminarFavorito(favorito.getId());
        }


        //  Elimino politicas
//        List<Politica> politicas = policitcaService.obtenerPoliticasDelProducto(id);
//        for (Politica politica : politicas) {
//            policitcaService.eliminarPolitica(politica.getId());
//        }

//        //  Elimino reviews
//        List<Review> reviews = reviewService.obtenerReviewsDelProductoId(id);
//        for (Review review : reviews) {
//            reviewService.eliminarReview(review.getId());
//        }


        Optional<Producto> productoBuscado = buscarProductoPorId(id);

        if (productoBuscado.isPresent()) {
            productoRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("No existe el producto con id: " + id);
        }

    }

    @Transactional
    public Producto actualizarProducto_OLD(Producto producto) {
        // Obtener el producto actual
        Producto productoExistente = productoRepository.findById(producto.getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Actualizar atributos principales
        productoExistente.setTitulo(producto.getTitulo());
        productoExistente.setDescripcion(producto.getDescripcion());
        productoExistente.setCategoria(producto.getCategoria());

        // Eliminar imágenes existentes
        // OLD
//        for (Imagen imagen : productoExistente.getImagenes()) {
//            imagenRepository.deleteById(imagen.getId());
//        }

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
        Categoria categoria = categoriarepository.findById(idCategoria)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada con ID: " + idCategoria));

        // Actualizar la categoría del producto
        producto.setCategoria(categoria);

        // Guardar el producto actualizado
        return productoRepository.save(producto);
    }

    @Override
    public Integer obtenerCantidadPorCategoria(Integer idCategoria) {
        Categoria categoria = new Categoria();
        categoria.setId(idCategoria);
        return productoRepository.findByCategoria(categoria).size();
    }

    @Override
    public List<Producto> buscarTopProductosCalificaciones(Integer cantidadProductos) {
        List<ValoracionPromedioDTO> mejoresPromedios = reviewService.obtenerTopProductosPorValoracion(cantidadProductos);

        List<ValoracionPromedioDTO> valoracionesTop = reviewService.obtenerTopProductosPorValoracion(cantidadProductos);

        // Mapear los IDs del top de ValoracionPromedioDTO a sus correspondientes entidades Producto
        return valoracionesTop.stream()
                .map(dto -> productoRepository.findById(dto.getIdProducto())
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado para ID: " + dto.getIdProducto())))
                .collect(Collectors.toList());
    }

    @Override
    public void eliminarProductosCategoriaId(Integer idCategoria) {
        Categoria categoria = new Categoria();
        categoria.setId(idCategoria);
        productoRepository.deleteByCategoria(categoria);
    }


    @Override
    public List<Producto> buscarPorductosPorIdCiudad(int idCiudad) {
        Ciudad ciudad = new Ciudad();
        ciudad.setId(idCiudad);
        return productoRepository.findByCiudad(ciudad);
    }

    @Override
    public List<Producto> buscarPorductosPorCiudadFecha(Integer ciudad_id, Date fecha_inicio, Date fecha_fin) {
        return productoRepository.findByCiudadFecha(ciudad_id, fecha_inicio, fecha_fin);
    }


    @Override
    @Transactional
    public Producto actualizarProducto(Producto productoActualizado) {

        Producto productoExistente = productoRepository.findById(productoActualizado.getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        productoExistente.setTitulo(productoActualizado.getTitulo());
        productoExistente.setDescripcion(productoActualizado.getDescripcion());

        if (productoActualizado.getCategoria() != null) {
            productoExistente.setCategoria(categoriarepository.findById(productoActualizado.getCategoria().getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada")));
        }

        if (productoActualizado.getCiudad() != null) {
            productoExistente.setCiudad(ciudadService.obtenerCiudadId(productoActualizado.getCiudad().getId())
                    .orElseThrow(() -> new RuntimeException("ciudad no encontrada")));
        }

        // imagenes
        if (productoActualizado.getImagenes() != null) {
            // Limpiar imágenes existentes y añadir las nuevas
            // OLD
            //imagenRepository.deleteAllByProductoId(productoExistente.getId());
            imagenService.eliminarImagenesDelProductoId(productoExistente.getId());

            Set<Imagen> nuevasImagenes = new HashSet<>();
            for (Imagen imagen : productoActualizado.getImagenes()) {
                imagen.setProducto(productoExistente);
                // OLD
                //nuevasImagenes.add(imagenRepository.save(imagen));
                nuevasImagenes.add(imagenService.crearImagen(imagen));
            }
            productoExistente.setImagenes(nuevasImagenes);
        }


        // politicas
        if (productoActualizado.getPoliticas() != null) {

            policitcaService.eliminarpoliticasDelProductoId(productoExistente.getId());

            Set<Politica> nuevasPoliticas = new HashSet<>();
            for (Politica politica : productoActualizado.getPoliticas()) {
                politica.setProducto(productoExistente);
                nuevasPoliticas.add(policitcaService.crearPolitica(politica));
            }
            productoExistente.setPoliticas(nuevasPoliticas);
        }

        productoExistente.setCaracteristicas(productoActualizado.getCaracteristicas());
        productoExistente.setPoliticas(productoActualizado.getPoliticas());

        return productoRepository.save(productoExistente);
    }


}
