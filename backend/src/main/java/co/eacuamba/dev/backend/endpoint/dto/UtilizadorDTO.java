package co.eacuamba.dev.backend.endpoint.dto;

import co.eacuamba.dev.backend.domain.model.Carro;
import co.eacuamba.dev.backend.domain.model.Utilizador;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class UtilizadorDTO {
    private Long id;
    private String nome;
    private String apelido;
    private String username;
    private Integer idade;

    @Builder.Default
    private List<CarroDTO> carroDTOList = new ArrayList<>();

    @JsonIgnore
    private Utilizador utilizador;

    public UtilizadorDTO(Utilizador utilizador) {
        if (Objects.isNull(utilizador))
            throw new IllegalArgumentException("O carro está nulo.");
        this.id = utilizador.getId();
        this.nome = utilizador.getNome();
        this.apelido = utilizador.getApelido();
        this.idade = utilizador.getIdade();
        this.username = utilizador.getUsername();
        this.carroDTOList = utilizador.getCarroList().stream().map(CarroDTO::new).collect(Collectors.toCollection(ArrayList::new));
    }

    public Utilizador getUtilizador() {
        return Utilizador
                .builder()
                .id(this.id)
                .idade(this.idade)
                .nome(this.nome)
                .apelido(this.apelido)
                .carroList(this.carroDTOList.stream().map(CarroDTO::getCarro).peek(carro -> carro.setUtilizador(utilizador)).collect(Collectors.toCollection(ArrayList::new)))
                .build();
    }
}
