package com.Turquesa.backEnd.categoria;

import jakarta.persistence.*;
import lombok.*;

@Getter@Setter@AllArgsConstructor@NoArgsConstructor
@Table(name="categoria")
@Entity(name = "categorias")
@EqualsAndHashCode(of = "id")
public class Categoria {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    public Categoria(CategoriaRequestDTO dados){
        this.nome = dados.nome();
    }

    public void atualizar(EditarCategoriaDTO dados){
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }

    }

}
