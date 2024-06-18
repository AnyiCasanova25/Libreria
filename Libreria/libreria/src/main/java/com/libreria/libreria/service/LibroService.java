package com.libreria.libreria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.libreria.libreria.interfaceService.ILibroService;
import com.libreria.libreria.interfaces.ILibro;
import com.libreria.libreria.models.Libro;

@Service
public class LibroService implements ILibroService {

    @Autowired
    private ILibro data;

    @Override
    public String save(Libro Libro) {
        data.save(Libro);
        return Libro.getIdLibro();
    }

    @Override
    public List<Libro> findAll() {
        List<Libro> listaLibro = (List<Libro>) data.findAll();
        return listaLibro;
    }

    @Override
    public List<Libro> filtroLibro(String filtro) {
        List<Libro> listaLibro = data.filtroLibro(filtro);
        return listaLibro;
    }

    @Override
    public Optional<Libro> findOne(String id) {
        Optional<Libro> Libro = data.findById(id);
        return Libro;
    }

    @Override
    public int deleteForever(String id) {
        data.deleteById(id);
        return 1;
    }
}
