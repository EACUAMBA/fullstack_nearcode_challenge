package co.eacuamba.dev.backend.domain.repository;

import co.eacuamba.dev.backend.domain.model.Utilizador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilizadorRepository extends JpaRepository<Utilizador, Long> {
}
