package co.eacuamba.dev.backend.endpoint.dto;

import co.eacuamba.dev.backend.domain.model.Carro;
import co.eacuamba.dev.backend.domain.model.Utilizador;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class CarroDTO {
    private Long id;
    private String marca;
    private String modelo;
    private String matricula;
    private String utilizadorNome;
    private Long utilizadorId;

    @JsonIgnore
    private Carro carro;

    public CarroDTO(Carro carro) {
        if (Objects.isNull(carro))
            throw new IllegalArgumentException("O carro está nulo.");
        this.id = carro.getId();
        this.marca = carro.getMarca();
        this.matricula = carro.getMatricula();
        this.modelo = carro.getModelo();
        this.utilizadorNome = carro.getUtilizador().getNome();
        this.utilizadorId = carro.getUtilizador().getId();
    }

    public Carro getCarro() {
        return Carro.builder()
                .marca(this.marca)
                .matricula(this.matricula)
                .modelo(this.modelo)
                .id(this.id)
                .utilizador(Utilizador.builder().nome(this.utilizadorNome).id(this.utilizadorId).build())
                .build();
    }
}
