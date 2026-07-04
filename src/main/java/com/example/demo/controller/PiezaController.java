package com.example.demo.controller;

import com.example.demo.model.PiezaNumismatica;
import com.example.demo.repository.PiezaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/piezas")
@CrossOrigin(origins = "http://localhost:5173") // Permite la conexión segura con React
@Tag(name = "Catálogo Numismático", description = "Endpoints reutilizables para gestionar las monedas de Bolivia")
public class PiezaController {

    @Autowired
    private PiezaRepository repository;

    @Operation(summary = "1. Listar catálogo completo", description = "Devuelve un JSON con todas las monedas, billetes y medallas históricas.")
    @GetMapping
    public List<PiezaNumismatica> listarTodas() {
        return repository.findAll();
    }

    @Operation(summary = "2. Registrar pieza histórica", description = "Añade una nueva pieza numismática enviando sus datos en formato JSON.")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PiezaNumismatica crear(@RequestBody PiezaNumismatica pieza) {
        return repository.save(pieza);
    }

    @Operation(summary = "3. Eliminar pieza del registro", description = "Borra permanentemente una pieza histórica utilizando su ID numérico.")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}