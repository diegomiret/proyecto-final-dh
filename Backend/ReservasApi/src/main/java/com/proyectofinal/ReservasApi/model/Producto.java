package com.proyectofinal.ReservasApi.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "productos")
@Getter @Setter
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    //@OneToMany(mappedBy = "producto")
    private Set<Imagen> imagenes;


    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = true)
    private Categoria categoria;

    /*
    @ManyToMany
    @JoinTable(name = "caracteristicas_productos",
            joinColumns = @JoinColumn(name = "producto_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristica_id"))
    private Set<Caracteristica> caracteristicas;
     */


    @ManyToMany
    @JoinTable(name = "caracteristicas_productos",
            joinColumns = @JoinColumn(name = "producto_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristica_id"))
    private Set<Caracteristica> caracteristicas;


    @ManyToOne
    @JoinColumn(name = "id_ciudad", nullable = true)
    private Ciudad ciudad;

}
