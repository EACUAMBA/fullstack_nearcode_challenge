package co.eacuamba.dev.backend.domain.repository;

import co.eacuamba.dev.backend.domain.model.Utilizador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilizadorRepository extends JpaRepository<Utilizador, Long> {
    Optional<Utilizador> findByUsername(@Param("username") String username);
}
