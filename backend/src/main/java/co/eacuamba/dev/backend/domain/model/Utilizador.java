package co.eacuamba.dev.backend.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;


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
    private Integer idade;

    private String password;
    private String username;

    @Builder.Default
    private Boolean accountNonExpired = Boolean.TRUE;
    @Builder.Default
    private Boolean accountNonLocked = Boolean.TRUE;
    @Builder.Default
    private Boolean credentialsNonExpired = Boolean.TRUE;
    @Builder.Default
    private Boolean enabled = Boolean.TRUE;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "utilizador", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private List<Carro> carroList = new ArrayList<>();

    @Builder.Default
    @Transient
    private List<? extends GrantedAuthority> grantedAuthorities = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.grantedAuthorities;
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
