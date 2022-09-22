package co.eacuamba.dev.backend;

import co.eacuamba.dev.backend.domain.model.Carro;
import co.eacuamba.dev.backend.domain.model.Utilizador;
import co.eacuamba.dev.backend.domain.repository.UtilizadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.*;
import java.util.stream.Stream;

@SpringBootApplication
public class Application implements CommandLineRunner {


    private final UtilizadorRepository utilizadorRepository;

    @Autowired
    public Application(UtilizadorRepository utilizadorRepository) {
        this.utilizadorRepository = utilizadorRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) {
        List<Utilizador> utilizadorList = Stream.of(
                Utilizador.builder().id(1L).nome("Alberto").apelido("John").carroList(
                        Arrays.asList(
                                Carro.builder().marca("GMC").matricula("ADH-978-HT").modelo("KL50").build(),
                                Carro.builder().marca("Honda").matricula("ADH-978-HT").modelo("KL50").build(),
                                Carro.builder().marca("Hynday").matricula("ADH-978-HT").modelo("KL50").build()
                        )
                ).password("$2a$12$pUjZfi2AnfB4j7CR1ys1uO.ELRgGXszi9ShbByg5aJR3qQQ996a/y").username("alberto").idade(30).build(),
                Utilizador.builder().id(2L).nome("Neusa").apelido("da Conceição").carroList(
                       Arrays.asList(
                               Carro.builder().marca("Nissan").matricula("ADH-978-HT").modelo("KL50").build(),
                               Carro.builder().marca("Mazda").matricula("ADH-978-HT").modelo("KL50").build(),
                               Carro.builder().marca("Jaguar").matricula("ADH-978-HT").modelo("KL50").build()
                       )
                ).password("$2a$12$pUjZfi2AnfB4j7CR1ys1uO.ELRgGXszi9ShbByg5aJR3qQQ996a/y").username("neusa").idade(30).build(),
                Utilizador.builder().id(3L).nome("Ricardo").apelido("John").idade(30).password("$2a$12$pUjZfi2AnfB4j7CR1ys1uO.ELRgGXszi9ShbByg5aJR3qQQ996a/y").username("ricardo").build(),
                Utilizador.builder().id(4L).nome("Maria").apelido("da Graça").password("$2a$12$pUjZfi2AnfB4j7CR1ys1uO.ELRgGXszi9ShbByg5aJR3qQQ996a/y").username("maria").idade(30).build()).peek(utilizador -> {
                    utilizador.getCarroList().forEach(carro -> carro.setUtilizador(utilizador));
        }).toList();

        utilizadorList.forEach(utilizador -> {
            System.out.println(utilizador.getNome()  + " - " + utilizador.getUsername());
            Optional<Utilizador> utilizadorOptional = this.utilizadorRepository.findById(utilizador.getId());
            if(utilizadorOptional.isEmpty()){
                this.utilizadorRepository.save(utilizador);
            }
        });
    }
}
