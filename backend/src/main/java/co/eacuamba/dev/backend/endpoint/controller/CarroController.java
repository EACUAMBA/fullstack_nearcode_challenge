package co.eacuamba.dev.backend.endpoint.controller;

import co.eacuamba.dev.backend.domain.model.Carro;
import co.eacuamba.dev.backend.domain.service.CarroService;
import co.eacuamba.dev.backend.endpoint.dto.CarroDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

//@CrossOrigin(origins = "*", allowedHeaders = {"*"})
@RestController
@RequestMapping(path = "/carros")
public class CarroController {

    private final CarroService carroService;

    @Autowired
    public CarroController(CarroService carroService) {
        this.carroService = carroService;
    }

    @GetMapping
    public ResponseEntity<List<CarroDTO>> get(){
        return ResponseEntity.ok(this.carroService.findAll());
    }

    @GetMapping(params = {"carroId"})
    public ResponseEntity<CarroDTO> getById(@RequestParam Long carroId){
        return ResponseEntity.ok(this.carroService.findById(carroId));
    }

    @PostMapping
    public ResponseEntity<CarroDTO> save(@RequestBody CarroDTO carroDTO){
        return new ResponseEntity<>(this.carroService.save(carroDTO), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody CarroDTO carroDTO){
        this.carroService.update(carroDTO);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping(params = {"carroId"})
    public ResponseEntity<Void> delete(@RequestParam Long carroId){
        this.carroService.delete(carroId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }


}
