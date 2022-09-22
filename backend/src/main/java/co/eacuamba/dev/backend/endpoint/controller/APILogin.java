package co.eacuamba.dev.backend.endpoint.controller;

import co.eacuamba.dev.backend.domain.model.Utilizador;
import co.eacuamba.dev.backend.domain.service.UtilizadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping(path = "/APILogin")
public class APILogin {
    private final UtilizadorService utilizadorService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public APILogin(UtilizadorService utilizadorService, PasswordEncoder passwordEncoder) {
        this.utilizadorService = utilizadorService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping(params = {"username", "password"})
    public ResponseEntity<Utilizador> login(@RequestParam String username, @RequestParam String password) {
        UserDetails userDetails = this.utilizadorService.loadUserByUsername(username);
        if (Objects.isNull(userDetails)) {
            throw new RuntimeException("Utilizador não existe!");
        } else {
            if (passwordEncoder.matches(password, userDetails.getPassword()))
                return ResponseEntity.ok((Utilizador) userDetails);
            throw new RuntimeException("Senha incorecta!");

        }
    }
}
