package com.libreria.libreria.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libreria.libreria.interfaceService.IMultaService;
import com.libreria.libreria.models.Multa;

@RestController
@RequestMapping("/api/v1/Multa/")
public class MultaController {

    @Autowired
    private IMultaService MultaService;

    @PostMapping("/")
    public ResponseEntity<Object> save(@ModelAttribute("Multa") Multa Multa) {

        if (Multa.getFechaMulta().equals("")) {

            return new ResponseEntity<>("La fecha de la multa es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Multa.getValorMulta().equals("")) {

            return new ResponseEntity<>("El valor de la multa es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Multa.getEstado().equals("")) {

            return new ResponseEntity<>("El estado es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        MultaService.save(Multa);
        return new ResponseEntity<>(Multa, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaMulta = MultaService.findAll();
        return new ResponseEntity<>(listaMulta, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaMulta = MultaService.multaExist(filtro);
        return new ResponseEntity<>(listaMulta, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable Date filtro) {
        var listaMulta = MultaService.filtroFechaMulta(filtro);
        return new ResponseEntity<>(listaMulta, HttpStatus.OK);
    }

    @DeleteMapping("/eliminarPermanente/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id) {
        MultaService.deleteForever(id);
        return new ResponseEntity<>("Registro eliminado Permanentemente", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("Multa") Multa MultaUpdate) {
        var Multa = MultaService.findOne(id).get();
        if (Multa != null) {

            Multa.setFechaMulta(MultaUpdate.getFechaMulta());
            Multa.setValorMulta(MultaUpdate.getValorMulta());
            Multa.setEstado(MultaUpdate.getEstado());

            MultaService.save(Multa);
            return new ResponseEntity<>(Multa, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error multa NO encontrada", HttpStatus.BAD_REQUEST);
        }
    }
}
