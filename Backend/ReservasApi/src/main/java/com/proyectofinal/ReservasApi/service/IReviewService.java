package com.proyectofinal.ReservasApi.service;

import com.proyectofinal.ReservasApi.DTO.ValoracionPromedioDTO;
import com.proyectofinal.ReservasApi.model.Review;

import java.util.List;

public interface IReviewService {

    public List<ValoracionPromedioDTO> obtenerValoracionesPromedio();

    public ValoracionPromedioDTO obtenerValoracionesPromedioDelProductoId(Integer id);

    public List<Review>  obtenerTodasLasReviews();

    public List<ValoracionPromedioDTO> obtenerTopProductosPorValoracion(int cantidadTop);

    public List<Review> obtenerReviewsDelProductoId(Integer idProducto);

    public void eliminarReview(Integer id);

    public Review crearReview(Review review);
}
