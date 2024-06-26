package com.libreria.libreria.interfaces;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.libreria.libreria.models.Multa;

@Repository
public interface IMulta extends CrudRepository<Multa, String>{

//     Usuario multado.
// o Préstamo
// o Fecha multa.
// o Estado.

    @Query("SELECT m FROM Multa m " +
    "JOIN m.Prestamo p " +
    "WHERE m.estado LIKE %?1% OR p.Estado LIKE %?2%")

    List<Multa> multaExist(String estado, String Estado);


    @Query("SELECT m FROM Multa m WHERE m.fechaMulta = ?1")

    List<Multa> filtroFechaMulta(Date  fechaMulta);
    
}
