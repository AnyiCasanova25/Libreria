package com.libreria.libreria.controller;

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

import com.libreria.libreria.interfaceService.ILibroService;
import com.libreria.libreria.models.Libro;

@RestController
@RequestMapping("/api/v1/Libro/")
public class LibroController {

    @Autowired
    private ILibroService LibroService;

    @PostMapping("/")
    public ResponseEntity<Object> save(@ModelAttribute("Libro") Libro Libro) {

        if (Libro.getAutor().equals("")) {

            return new ResponseEntity<>("El Autor es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Libro.getGenero().equals("")) {

            return new ResponseEntity<>("El genero es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Libro.getTitulo().equals("")) {

            return new ResponseEntity<>("El titulo es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Libro.getISNB().equals("")) {

            return new ResponseEntity<>("El ISNB (codigo del libro) es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Libro.getEjemplaresDisponibles().equals("")) {

            return new ResponseEntity<>("Los ejemplares disponibles es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Libro.getEjemplaresOcupados().equals("")) {

            return new ResponseEntity<>("Los ejemplares ocupados es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        LibroService.save(Libro);
        return new ResponseEntity<>(Libro, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaLibro = LibroService.findAll();
        return new ResponseEntity<>(listaLibro, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaLibro = LibroService.filtroLibro(filtro);
        return new ResponseEntity<>(listaLibro, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var Libro = LibroService.findOne(id);
        return new ResponseEntity<>(Libro,HttpStatus.OK);
    }

    @DeleteMapping("/eliminarPermanente/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id) {
        LibroService.deleteForever(id);
        return new ResponseEntity<>("Registro eliminado Permanentemente", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("Libro") Libro LibroUpdate) {
        var Libro = LibroService.findOne(id).get();
        if (Libro != null) {

            Libro.setAutor(LibroUpdate.getAutor());
            Libro.setGenero(LibroUpdate.getGenero());
            Libro.setTitulo(LibroUpdate.getTitulo());
            Libro.setISNB(LibroUpdate.getISNB());
            Libro.setEjemplaresDisponibles(LibroUpdate.getEjemplaresDisponibles());
            Libro.setEjemplaresOcupados(LibroUpdate.getEjemplaresOcupados());

            LibroService.save(Libro);
            return new ResponseEntity<>(Libro, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error libro NO encontrado", HttpStatus.BAD_REQUEST);
        }
    }

}
