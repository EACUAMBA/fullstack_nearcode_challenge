package co.eacuamba.dev.backend.domain.model;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "utilizador")
public class Utilizador implements UserDetails {
    @Id
    @SequenceGenerator(name = "utilizador_generator", sequenceName = "utilizador_sequence", allocationSize = 1)
    @GeneratedValue(generator = "utilizador_generator", strategy = GenerationType.SEQUENCE)
    private Long id;
    private String nome;
    private String apelido;
    private LocalDate dataNascimento;

    @Builder.Default
    private String password = "$2a$12$pUjZfi2AnfB4j7CR1ys1uO.ELRgGXszi9ShbByg5aJR3qQQ996a/y";
    @Builder.Default
    private String username = "edilson";

    @Builder.Default
    private Boolean accountNonExpired = Boolean.TRUE;
    @Builder.Default
    private Boolean accountNonLocked = Boolean.TRUE;
    @Builder.Default
    private Boolean credentialsNonExpired = Boolean.TRUE;
    @Builder.Default
    private Boolean enabled = Boolean.TRUE;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<SimpleGrantedAuthority>();
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
