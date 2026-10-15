package backend.residuos.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Mapeamento mínimo: a reserva precisa referenciar o resíduo. Os demais campos ficam para o CRUD de resíduos.
@Entity
@Table(name = "residuos")
@Getter
@Setter
@NoArgsConstructor
public class Residuo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
