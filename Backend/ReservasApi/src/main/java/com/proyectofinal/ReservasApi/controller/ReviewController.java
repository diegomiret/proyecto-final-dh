package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.DTO.ReviewDTO;
import com.proyectofinal.ReservasApi.DTO.ValoracionPromedioDTO;
import com.proyectofinal.ReservasApi.model.Favorito;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.model.Review;
import com.proyectofinal.ReservasApi.model.Usuario;
import com.proyectofinal.ReservasApi.service.imple.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/promedios")
    public ResponseEntity<Collection<ValoracionPromedioDTO>> obtenerValoracionesPromedios() {
        return ResponseEntity.ok(reviewService.obtenerValoracionesPromedio());
    }

    @GetMapping("/promedios/producto/{id}")
    public ResponseEntity<ValoracionPromedioDTO> obtenerValoracionPromediosProducto(@PathVariable Integer id) {
        return ResponseEntity.ok(reviewService.obtenerValoracionesPromedioDelProductoId(id));
    }

    @GetMapping
    public ResponseEntity<Collection<Review>> obtenerTodasLasReviews() {
        return ResponseEntity.ok(reviewService.obtenerTodasLasReviews());
    }

    @GetMapping("/top-promedios/{cantidad}")
    public ResponseEntity<List<ValoracionPromedioDTO>> obtenerTopProductos(@PathVariable int cantidad) {
        List<ValoracionPromedioDTO> topProductos = reviewService.obtenerTopProductosPorValoracion(cantidad);
        return ResponseEntity.ok(topProductos);
    }


    @PostMapping
    public ResponseEntity<ReviewDTO> crearReview(@RequestBody ReviewDTO review) {
        //return ResponseEntity.ok(reviewService.crearReview(review));

        Review reviewNueva = new Review();
        reviewNueva.setValoracion(review.getValoracion());

        reviewNueva.setUsuario(new Usuario());
        reviewNueva.getUsuario().setId(review.getUsuarioId());

        reviewNueva.setProducto(new Producto());
        reviewNueva.getProducto().setId(review.getProductoId());

        reviewNueva.setComentario(review.getComentario());

        reviewNueva.setFecha_review(review.getFechaReview());


        Review savedReview = reviewService.crearReview(reviewNueva);

        // Transformar a DTO
        ReviewDTO reviewDTO = new ReviewDTO(savedReview);

        return ResponseEntity.ok(reviewDTO);
    }

}
