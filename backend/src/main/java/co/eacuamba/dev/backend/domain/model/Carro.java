package co.eacuamba.dev.backend.domain.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "carro")
public class Carro {
    @Id
    @SequenceGenerator(name = "carro_generator", sequenceName = "carro_sequence", allocationSize = 1)
    @GeneratedValue(generator = "carro_generator", strategy = GenerationType.SEQUENCE)
    private Long id;

    private String marca;
    private String modelo;
    private String matricula;
}
