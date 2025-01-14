package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.model.Caracteristica;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.service.imple.CaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaController {

    @Autowired
    private CaracteristicaService caracteristicaService;

    @GetMapping
    public ResponseEntity<List<Caracteristica>> listarCaracteristicas() {
        return ResponseEntity.ok(caracteristicaService.listarCaracteristicas());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCaracteristica(@PathVariable Integer id) {

        caracteristicaService.eliminarCaracteristica(id);

        //  Si no arrojó una excepción, devuelvo el estado ok 200
        return ResponseEntity.ok("Se eliminó la caracteristica con id: " + id);
    }

    @PostMapping
    public ResponseEntity<?> crearCaracteristica(@RequestBody Caracteristica caracterisica) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(caracteristicaService.crearCaracteristica(caracterisica));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Caracteristica>> listarCaracteristicas(@PathVariable Integer id) {
        return ResponseEntity.ok(caracteristicaService.obtenerCaracteristica(id));
    }



    @PutMapping("/{id}")
    public ResponseEntity<Caracteristica> updateProducto(@PathVariable Integer id, @RequestBody Caracteristica caracteristica) {

        caracteristica.setId(id);
        Caracteristica caracteristicaActualizada = caracteristicaService.actualizarCaracteristica(caracteristica);
        return ResponseEntity.ok(caracteristicaActualizada);
    }

}
