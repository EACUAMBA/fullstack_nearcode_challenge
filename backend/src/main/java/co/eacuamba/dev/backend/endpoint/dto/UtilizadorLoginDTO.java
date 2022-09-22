package co.eacuamba.dev.backend.endpoint.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UtilizadorLoginDTO {
    private String userame;
    private String password;
}
