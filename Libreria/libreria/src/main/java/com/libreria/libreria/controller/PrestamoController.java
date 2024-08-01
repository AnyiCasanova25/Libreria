package com.libreria.libreria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libreria.libreria.interfaceService.IPrestamoService;
import com.libreria.libreria.models.Prestamo;

@RestController
@RequestMapping("/api/v1/Prestamo/")
public class PrestamoController {

    @Autowired
    private IPrestamoService PrestamoService;

    @PostMapping("/")
    public ResponseEntity<Object> save(@RequestBody Prestamo Prestamo) {

        if (Prestamo.getFechaPrestamo().equals("")) {

            return new ResponseEntity<>("La fecha del prestamo es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Prestamo.getFechaDevolucion().equals("")) {

            return new ResponseEntity<>("La fecha de devolucion es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Prestamo.getEstado().equals("")) {

            return new ResponseEntity<>("El estado es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        PrestamoService.save(Prestamo);
        return new ResponseEntity<>(Prestamo, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaPrestamo = PrestamoService.findAll();
        return new ResponseEntity<>(listaPrestamo, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaPrestamo = PrestamoService.prestamoExist(filtro);
        return new ResponseEntity<>(listaPrestamo, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var Prestamo = PrestamoService.findOne(id);
        return new ResponseEntity<>(Prestamo, HttpStatus.OK);
    }

    @DeleteMapping("/eliminarPermanente/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id) {
        PrestamoService.deleteForever(id);
        return new ResponseEntity<>("Registro eliminado permanentemente", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @RequestBody Prestamo PrestamoUpdate) {
        var Prestamo = PrestamoService.findOne(id).get();
        if (Prestamo != null) {

            Prestamo.setFechaPrestamo(PrestamoUpdate.getFechaPrestamo());
            Prestamo.setFechaDevolucion(PrestamoUpdate.getFechaDevolucion());
            Prestamo.setEstado(PrestamoUpdate.getEstado());

            PrestamoService.save(Prestamo);
            return new ResponseEntity<>(Prestamo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error prestamo NO encontrado", HttpStatus.BAD_REQUEST);
        }
    }

}
