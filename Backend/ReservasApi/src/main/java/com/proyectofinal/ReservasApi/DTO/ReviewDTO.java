package com.proyectofinal.ReservasApi.DTO;

import com.proyectofinal.ReservasApi.model.Review;

import java.sql.Date;

public class ReviewDTO {

    private Integer id;
    private Integer productoId;
    private Integer usuarioId;
    private Integer valoracion;
    private String comentario;
    private Date fechaReview;

    public ReviewDTO() {
    }

    public ReviewDTO(Review review) {
        this.id = review.getId();
        this.productoId = review.getProducto() != null ? review.getProducto().getId() : null;
        this.usuarioId = review.getUsuario() != null ? review.getUsuario().getId() : null;
        this.valoracion = review.getValoracion();
        this.comentario = review.getComentario();
        this.fechaReview = review.getFecha_review();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProductoId() {
        return productoId;
    }

    public void setProductoId(Integer productoId) {
        this.productoId = productoId;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Integer getValoracion() {
        return valoracion;
    }

    public void setValoracion(Integer valoracion) {
        this.valoracion = valoracion;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Date getFechaReview() {
        return fechaReview;
    }

    public void setFechaReview(Date fechaReview) {
        this.fechaReview = fechaReview;
    }
}
