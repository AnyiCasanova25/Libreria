package com.libreria.libreria.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.libreria.libreria.models.Prestamo;

@Repository
public interface IPrestamo extends CrudRepository<Prestamo, String>{

    
    @Query("SELECT p FROM Prestamo p " +
    "JOIN p.Usuario u " +
    "JOIN p.Libro l " +
    "WHERE p.estado LIKE %?1% OR u.nombre LIKE %?2% OR l.titulo LIKE %?3%")
    List<Prestamo> prestamoExist(String estado, String nombre, String titulo);

}
