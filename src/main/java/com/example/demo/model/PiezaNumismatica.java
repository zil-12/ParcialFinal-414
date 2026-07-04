package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "piezas_numismaticas")
public class PiezaNumismatica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_pieza")
    private String nombre;

    @Column(name = "tipo_pieza")
    private String tipo;

    @Column(name = "periodo_historico")
    private String periodo;

    @Column(name = "anio_emision")
    private Integer anio; // Mantenemos el nombre de la variable para no romper React, pero la columna SQL es segura

    @Column(name = "descripcion_completa", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "url_imagen")
    private String urlImagen;
}