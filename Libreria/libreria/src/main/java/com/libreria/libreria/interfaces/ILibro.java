package com.libreria.libreria.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.libreria.libreria.models.Libro;

@Repository
public interface ILibro extends CrudRepository<Libro, String>{
    
    // Buscar libros por título, autor, género o ISBN.
    @Query("SELECT l FROM Libro l WHERE l.Titulo LIKE %?1% OR l.Autor LIKE %?1% OR l.Genero LIKE %?1% OR l.ISNB LIKE %?1%")
    List<Libro> filtroLibro(String filtro);
}
