package com.libreria.libreria.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Libro")
public class Libro {

    /*
     * Título
     * o Autor
     * o ISBN
     * o Género
     * o Número de ejemplares disponibles
     * o Número de ejemplares ocupados
     */

     @Id
     @GeneratedValue(strategy = GenerationType.UUID)
     @Column(name = "idLibro", nullable = false, length = 36)
     private String idLibro;

     @Column(name = "autor", nullable = false, length = 36)
     private String autor;

     @Column(name = "isbn", nullable = false, length = 13)
     private String isbn;

     @Column(name = "genero", nullable = false, length = 36)
     private String genero;

     @Column(name = "titulo", nullable = false, length = 36)
     private String titulo;

     @Column(name = "ejemplaresDisponibles", nullable = false, length = 36)
     private String ejemplaresDisponibles;

     @Column(name = "ejemplaresOcupados", nullable = false, length = 36)
     private String ejemplaresOcupados;
}
