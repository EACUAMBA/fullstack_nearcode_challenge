package co.eacuamba.dev.backend.domain.service;

import co.eacuamba.dev.backend.domain.model.Utilizador;
import co.eacuamba.dev.backend.domain.repository.UtilizadorRepository;
import co.eacuamba.dev.backend.endpoint.dto.UtilizadorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UtilizadorService implements UserDetailsService {

    private final UtilizadorRepository utilizadorRepository;

    @Autowired
    public UtilizadorService(UtilizadorRepository utilizadorRepository) {
        this.utilizadorRepository = utilizadorRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Utilizador> utilizadorOptional = utilizadorRepository.findByUsername(username);
        if(utilizadorOptional.isPresent()){
            Utilizador utilizador = utilizadorOptional.get();
            List<SimpleGrantedAuthority> simpleGrantedAuthorityList = this.loadGrandAuthorityList(utilizadorOptional.get()).stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
            utilizador.setGrantedAuthorities(simpleGrantedAuthorityList);
            return utilizador;
        }
        else {
            return null;
        }
    }
    public List<String> loadGrandAuthorityList(Utilizador utilizador){
        if(utilizador.getUsername().equals("maria")){
            return Collections.singletonList("ADMIN");
        }
        return new ArrayList<>();
    }

    public List<UtilizadorDTO> findAll() {
        return this.utilizadorRepository.findAll().stream().map(UtilizadorDTO::new).collect(Collectors.toList());
    }

    public Utilizador findById(Long utilizadorId) {
        Optional<Utilizador> utilizadorOptional = this.utilizadorRepository.findById(utilizadorId);
        if(utilizadorOptional.isPresent()){
            return utilizadorOptional.get();
        }
        else {
            throw new RuntimeException("Utilizador não foi encntrado!");
        }
    }

    public Utilizador save(UtilizadorDTO utilizadorDTO) {
        return this.utilizadorRepository.save(utilizadorDTO.getUtilizador());
    }

    public void update(UtilizadorDTO utilizadorDTO) {
        Utilizador utilizador = utilizadorDTO.getUtilizador();
        this.utilizadorRepository.save(utilizador);
    }

    public void delete(Long utilizadorId) {
        Optional<Utilizador> utilizadorOptional = this.utilizadorRepository.findById(utilizadorId);
        utilizadorOptional.ifPresent((this.utilizadorRepository::delete));
    }
}
