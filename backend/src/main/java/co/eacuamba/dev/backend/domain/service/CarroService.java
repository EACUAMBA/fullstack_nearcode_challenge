package co.eacuamba.dev.backend.domain.service;

import co.eacuamba.dev.backend.domain.model.Carro;
import org.springframework.stereotype.Service;

@Service
public class CarroService {
    public Carro save(Carro carro) {
        return carro.toBuilder().id(2L).build();
    }
}
