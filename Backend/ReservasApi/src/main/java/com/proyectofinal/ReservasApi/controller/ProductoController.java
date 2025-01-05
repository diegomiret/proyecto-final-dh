package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private IProductoService productoService;


    @GetMapping("/aleatorios")
    @Transactional
    public ResponseEntity<Collection<Producto>> listaProductosAleatorios() {
        return ResponseEntity.ok(productoService.listaProductosAleatorios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Producto>> buscarProductoPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.buscarProductoPorId(id));
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<Producto>> buscarProductoPorIdCategoria(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.buscarPorductosPorIdCategoria(id));
    }

    @PostMapping
    public ResponseEntity<?> crearProducto(@RequestBody Producto producto) {
        ResponseEntity<Producto> response;
        List<Producto> productos = productoService.buscarProductoPorTitulo(producto.getTitulo());

        if (productos.size() > 0) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Ya existe el alojamiento con el título " + producto.getTitulo());

        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productoService.crearProducto(producto));
    }
}
