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

@Entity(name = "Multa")
public class Multa {

    // o Usuario multado.
    // o Préstamo
    // o Valor multa.
    // o Fecha multa.
    // o Estado.

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idMulta", nullable = false, length = 36)
    private String idMulta;

    @ManyToOne
    @JoinColumn(name = "idPrestamo")
    private Prestamo Prestamo;

    @Column(name = "valorMulta", nullable = false, length = 40)
    private String valorMulta;

    @Column(name = "fechaMulta", nullable = false, length = 36)
    private Date fechaMulta;

    @Column(name = "estado", nullable = false, length = 36)
    private String estado;
}
