package co.eacuamba.dev.backend.domain.service;

import co.eacuamba.dev.backend.domain.model.Utilizador;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UtilizadorService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return Utilizador.builder().id(1L).nome("Edilson Alexandre Cuamba").build();
    }
}
