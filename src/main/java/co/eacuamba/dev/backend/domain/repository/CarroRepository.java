package co.eacuamba.dev.backend.domain.repository;

import co.eacuamba.dev.backend.domain.model.Carro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarroRepository extends JpaRepository<Carro, Long> {
}
