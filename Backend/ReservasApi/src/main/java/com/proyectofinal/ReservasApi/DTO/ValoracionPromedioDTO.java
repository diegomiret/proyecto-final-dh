package com.proyectofinal.ReservasApi.DTO;

public class ValoracionPromedioDTO {

    private Integer idProducto;

    private Double promedio;

    private Integer cantidadValoraciones;



    // Constructor con los tipos correctos
    public ValoracionPromedioDTO(Integer idProducto, Double promedio, Integer cantidadValoraciones) {
        this.idProducto = idProducto;
        this.promedio = promedio;
        this.cantidadValoraciones = cantidadValoraciones;
    }

    // Getters y setters
    public Integer getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public Double getPromedio() {
        return promedio;
    }

    public void setPromedio(Double promedio) {
        this.promedio = promedio;
    }

    public Integer getCantidadValoraciones() {
        return cantidadValoraciones;
    }

    public void setCantidadValoraciones(Integer cantidadValoraciones) {
        this.cantidadValoraciones = cantidadValoraciones;
    }
}
