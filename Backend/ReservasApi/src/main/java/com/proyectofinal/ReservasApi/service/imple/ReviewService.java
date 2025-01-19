package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.DTO.ValoracionPromedioDTO;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.model.Review;
import com.proyectofinal.ReservasApi.repository.IReviewRepository;
import com.proyectofinal.ReservasApi.service.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReviewService implements IReviewService {

    @Autowired
    private IReviewRepository reviewRepository;


    @Override
    public List<ValoracionPromedioDTO> obtenerValoracionesPromedio() {
        // Obtiene todas las reviews
        List<Review> reviews = reviewRepository.findAll();

        if (reviews.isEmpty()){
            return new ArrayList<>();
        }

        // Usa un Map para agrupar por idProducto y calcular la información
        Map<Integer, List<Review>> agrupadasPorProducto = reviews.stream()
        // OLD
        //.collect(Collectors.groupingBy(review -> review.getProductoId()));
                .collect(Collectors.groupingBy(review -> review.getProducto().getId()));

        // Genera la lista de ValoracionPromedioDTO
        List<ValoracionPromedioDTO> valoracionesPromedio = new ArrayList<>();
        for (Map.Entry<Integer, List<Review>> entry : agrupadasPorProducto.entrySet()) {
            Integer idProducto = entry.getKey();
            List<Review> reviewsProducto = entry.getValue();

            // Calcula el promedio y la cantidad de valoraciones
            double promedio = reviewsProducto.stream()
                    .mapToInt(Review::getValoracion)
                    .average()
                    .orElse(0.0);

            int cantidadValoraciones = reviewsProducto.size();

            // Crea el DTO y lo agrega a la lista
            ValoracionPromedioDTO dto = new ValoracionPromedioDTO(idProducto, promedio, cantidadValoraciones);

            dto.setIdProducto(idProducto);
            dto.setPromedio(promedio);
            dto.setCantidadValoraciones(cantidadValoraciones);

            valoracionesPromedio.add(dto);
        }

        return valoracionesPromedio;
    }

    @Override
    public ValoracionPromedioDTO obtenerValoracionesPromedioDelProductoId(Integer idProducto) {
        // Obtiene todas las reviews asociadas al idProducto
        Producto producto = new Producto();
        producto.setId(idProducto);
        List<Review> reviewsProducto = reviewRepository.findByProducto(producto);

        if (reviewsProducto.isEmpty()) {
            ValoracionPromedioDTO valoracionVacia = new ValoracionPromedioDTO(idProducto, 0.0, 0);

            valoracionVacia.setIdProducto(idProducto);
            valoracionVacia.setPromedio(0.0);
            valoracionVacia.setCantidadValoraciones(0);
            return valoracionVacia;
        }

        // Calcula el promedio y la cantidad de valoraciones
        double promedio = reviewsProducto.stream()
                .mapToInt(Review::getValoracion)
                .average()
                .orElse(0.0);

        int cantidadValoraciones = reviewsProducto.size();

        // Crea y retorna el DTO
        ValoracionPromedioDTO dto = new ValoracionPromedioDTO(idProducto, promedio, cantidadValoraciones);
        dto.setIdProducto(idProducto);
        dto.setPromedio(promedio);
        dto.setCantidadValoraciones(cantidadValoraciones);

        return dto;
    }

    @Override
    public List<Review> obtenerTodasLasReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public List<ValoracionPromedioDTO> obtenerTopProductosPorValoracion(int cantidadTop) {
        // Recuperar todas las reviews
        List<Review> reviews = reviewRepository.findAll();

        // Agrupar por producto y calcular promedio y cantidad de valoraciones
        Map<Integer, List<Review>> reviewsPorProducto = reviews.stream()
                .collect(Collectors.groupingBy(review -> review.getProducto().getId()));

        // Transformar a una lista de ValoracionPromedioDTO
        List<ValoracionPromedioDTO> valoraciones = reviewsPorProducto.entrySet().stream()
                .map(entry -> {
                    Integer idProducto = entry.getKey();
                    List<Review> reviewsDeProducto = entry.getValue();

                    Double promedio = reviewsDeProducto.stream()
                            .collect(Collectors.averagingInt(Review::getValoracion));

                    Integer cantidadValoraciones = reviewsDeProducto.size();

                    return new ValoracionPromedioDTO(idProducto, promedio, cantidadValoraciones);
                })
                .sorted(Comparator.comparingDouble(ValoracionPromedioDTO::getPromedio).reversed()) // Ordenar por promedio descendente
                .limit(cantidadTop) // Tomar los top 'cantidadTop'
                .collect(Collectors.toList());

        return valoraciones;
    }

    @Override
    public List<Review> obtenerReviewsDelProductoId(Integer idProducto) {
        Producto producto = new Producto();
        producto.setId(idProducto);

        return reviewRepository.findReviewsByProducto(producto);
    }

    @Override
    public void eliminarReview(Integer id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public Review crearReview(Review review) {
        return reviewRepository.save(review);
    }
}
