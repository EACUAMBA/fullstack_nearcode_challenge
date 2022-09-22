package co.eacuamba.dev.backend.domain.service;

import co.eacuamba.dev.backend.domain.model.Carro;
import co.eacuamba.dev.backend.domain.model.Utilizador;
import co.eacuamba.dev.backend.domain.repository.CarroRepository;
import co.eacuamba.dev.backend.domain.repository.UtilizadorRepository;
import co.eacuamba.dev.backend.endpoint.dto.CarroDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarroService {

    private final CarroRepository carroRepository;
    private final UtilizadorService utilizadorService;
    private final UtilizadorRepository utilizadorRepository;

    @Autowired
    public CarroService(CarroRepository carroRepository, UtilizadorService utilizadorService, UtilizadorRepository utilizadorRepository) {
        this.carroRepository = carroRepository;
        this.utilizadorService = utilizadorService;
        this.utilizadorRepository = utilizadorRepository;
    }

    public CarroDTO save(CarroDTO carroDTO) {
        Carro carro = carroDTO.getCarro();
        Optional<Utilizador> utilizadorOptional = this.utilizadorRepository.findById(carroDTO.getUtilizadorId());
        if(utilizadorOptional.isPresent()){
            carro.setUtilizador(utilizadorOptional.get());
        }else carro.setUtilizador(null);
        return new CarroDTO(this.carroRepository.save(carro));
    }

    public CarroDTO update(CarroDTO carroDTO) {
        Optional<Carro> carroOptional = this.carroRepository.findById(carroDTO.getId());
        if(carroOptional.isPresent()){
            Utilizador utilizador = this.utilizadorService.findById(carroDTO.getUtilizadorId());
            Carro carroDTOCarro = carroDTO.getCarro();
            carroDTOCarro.setUtilizador(utilizador);
            Carro carro = carroRepository.save(carroDTOCarro);
            return new CarroDTO(carro);
        }else {
            throw new IllegalArgumentException("O carro que tentas actualizar não existe!");
        }
    }

    public List<CarroDTO> findAll(){
        return this.carroRepository.findAll().stream()
                .map(CarroDTO::new)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public void delete(Long carroId) {
        Optional<Carro> carroOptional = this.carroRepository.findById(carroId);
        if(carroOptional.isPresent()){
            this.carroRepository.delete(carroOptional.get());
        }else {
            throw new IllegalArgumentException("O carro que tentas apagar não existe!");
        }
    }

    public CarroDTO findById(Long carroId) {
        Optional<Carro> carroOptional = this.carroRepository.findById(carroId);
        if(carroOptional.isPresent()){
            return new CarroDTO(carroOptional.get());
        }else {
            throw new IllegalArgumentException("O carro que procuras não existe!");
        }
    }
}
