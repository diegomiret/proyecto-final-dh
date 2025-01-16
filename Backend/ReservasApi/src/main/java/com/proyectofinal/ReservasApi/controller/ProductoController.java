package com.proyectofinal.ReservasApi.controller;

import com.proyectofinal.ReservasApi.DTO.ProductoUpdateCategoriaDTO;
import com.proyectofinal.ReservasApi.exception.ResourceNotFoundException;
import com.proyectofinal.ReservasApi.model.Categoria;
import com.proyectofinal.ReservasApi.model.Producto;
import com.proyectofinal.ReservasApi.service.ICategoriaService;
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
    @Autowired
    private ICategoriaService categoriaService;


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

    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        return ResponseEntity.ok(productoService.listarProductos());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) throws ResourceNotFoundException {
        productoService.eliminarProducto(id);

        //  Si no arrojó una excepción, devuelvo el estado ok 200
        return ResponseEntity.ok("Se eliminó el producto con id: " + id);
    }





    @PutMapping("/OLD/{id}")
    public ResponseEntity<Producto> updateProductoOLD(@PathVariable Integer id, @RequestBody Producto producto) {
        if (!id.equals(producto.getId())) {
            return ResponseEntity.badRequest().build();
        }
        Producto updatedProducto = productoService.actualizarProducto(producto);
        return ResponseEntity.ok(updatedProducto);
    }

    @PutMapping("/actualizar-categoria")
    public ResponseEntity<Producto> actualizarCategoriaProducto(@RequestBody ProductoUpdateCategoriaDTO updateCategoriaDto) {
        Integer idProducto = updateCategoriaDto.getIdProducto();
        Integer idCategoria = updateCategoriaDto.getIdCategoria();

        Producto productoActualizado = productoService.actualizarCategoriaProducto(idProducto, idCategoria);

        return ResponseEntity.ok(productoActualizado);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Integer id, @RequestBody Producto producto) {
        Optional<Producto> productoViejo = productoService.buscarProductoPorId(id);

        if (productoViejo == null) {
            return ResponseEntity.notFound().build();
        }

        producto.setId(id);
        return ResponseEntity.ok(productoService.actualizarProducto(producto));
    }


    @GetMapping("/cantidadProductos")
    public ResponseEntity<Integer> obtenerCantidadTotalProductos() {
        return ResponseEntity.ok(productoService.listarProductos().size());
    }

    @GetMapping("/ciudad/{id}")
    public ResponseEntity<List<Producto>> buscarProductoPorIdCiudad(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.buscarPorductosPorIdCiudad(id));
    }

}
