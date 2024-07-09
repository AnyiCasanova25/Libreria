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

     @Column(name = "Autor", nullable = false, length = 36)
     private String Autor;

     @Column(name = "isbn", nullable = false, length = 13)
     private String isbn;

     @Column(name = "Genero", nullable = false, length = 36)
     private String Genero;

     @Column(name = "Titulo", nullable = false, length = 36)
     private String Titulo;

     @Column(name = "EjemplaresDisponibles", nullable = false, length = 36)
     private String EjemplaresDisponibles;

     @Column(name = "EjemplaresOcupados", nullable = false, length = 36)
     private String EjemplaresOcupados;
}
