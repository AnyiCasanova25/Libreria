package com.libreria.libreria.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity(name = "Prestamo")
public class Prestamo {

    // o Fecha de préstamo
    // o Fecha de devolución
    // o Usuario que realiza el préstamo
    // o Libro prestado
    // o Estado
    // 1. Préstamo
    // 2. Entregado
    // 3. Cancelado


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idPrestamo", nullable = false, length = 36)
    private String idPrestamo;

    @Column(name = "fechaPrestamo", nullable = false)
    private Date fechaPrestamo;

    @Column(name = "fechaDevolucion", nullable = false, length = 36)
    private Date fechaDevolucion;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario Usuario;

    @ManyToOne
    @JoinColumn(name = "idLibro")
    private Libro Libro;

    @Column(name = "Estado", nullable = false, length = 36)
    private String Estado;
}
