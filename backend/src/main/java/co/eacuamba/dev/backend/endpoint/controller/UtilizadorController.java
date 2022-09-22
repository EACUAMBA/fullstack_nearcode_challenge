package co.eacuamba.dev.backend.endpoint.controller;

import co.eacuamba.dev.backend.domain.service.CarroService;
import co.eacuamba.dev.backend.domain.service.UtilizadorService;
import co.eacuamba.dev.backend.endpoint.dto.CarroDTO;
import co.eacuamba.dev.backend.endpoint.dto.UtilizadorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/utilizadores")
public class UtilizadorController {
    private final CarroService carroService;
    private final UtilizadorService utilizadorService;

    @Autowired
    public UtilizadorController(CarroService carroService, UtilizadorService utilizadorService) {
        this.carroService = carroService;
        this.utilizadorService = utilizadorService;
    }

    @GetMapping
    public ResponseEntity<List<UtilizadorDTO>> get(){
        return ResponseEntity.ok(this.utilizadorService.findAll());
    }

    @GetMapping(params = {"utilizadorId"})
    public ResponseEntity<UtilizadorDTO> getById(@RequestParam Long utilizadorId){
        return ResponseEntity.ok(new UtilizadorDTO(this.utilizadorService.findById(utilizadorId)));
    }

    @PostMapping
    public ResponseEntity<UtilizadorDTO> save(@RequestBody UtilizadorDTO utilizadorDTO){
        return new ResponseEntity<UtilizadorDTO>(new UtilizadorDTO(this.utilizadorService.save(utilizadorDTO)), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody UtilizadorDTO utilizadorDTO){
       this.utilizadorService.update(utilizadorDTO);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping(params = {"utilizadorId"})
    public ResponseEntity<Void> delete(@RequestParam Long utilizadorId){
        this.utilizadorService.delete(utilizadorId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
