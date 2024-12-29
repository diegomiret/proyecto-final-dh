package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

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
}
