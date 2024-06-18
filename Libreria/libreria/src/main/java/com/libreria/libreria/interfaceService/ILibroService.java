package com.libreria.libreria.interfaceService;

import java.util.List;
import java.util.Optional;

import com.libreria.libreria.models.Libro;

public interface ILibroService {
    
    public String save(Libro Libro);

    public List<Libro> findAll();

    public List<Libro> filtroLibro(String filtro);

    public Optional<Libro> findOne(String id);

    public int deleteForever(String id);
}
