package co.eacuamba.dev.backend.endpoint.controller;

import co.eacuamba.dev.backend.domain.model.Carro;
import co.eacuamba.dev.backend.domain.service.CarroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "/carro")
public class CarroController {

    private final CarroService carroService;

    @Autowired
    public CarroController(CarroService carroService) {
        this.carroService = carroService;
    }

    @GetMapping
    public ResponseEntity<List<Carro>> get(){
        return ResponseEntity.ok(Arrays.asList(Carro.builder().marca("Nissan").matricula("MMM-900-AD").modelo("Navara").build()));
    }

    @PostMapping
    public ResponseEntity<Carro> save(@RequestParam Carro carro){
        return new ResponseEntity<>(this.carroService.save(carro), HttpStatus.CREATED);
    }
}
