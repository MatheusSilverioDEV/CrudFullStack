package com.Turquesa.backEnd.Servico;


import com.Turquesa.backEnd.categoria.Categoria;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "servico")
@Table(name = "servicos")
@EqualsAndHashCode(of = "id")
@Getter@Setter@AllArgsConstructor@NoArgsConstructor
public class Servico {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String imagem;
    private BigDecimal valor;
    private String descricao;
    private Boolean status;

    @ManyToMany
    @JoinTable(
            name = "servico_categorias",
            joinColumns = @JoinColumn(name = "servico_id"),
            inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private Set<Categoria> categorias = new HashSet<>();



    

    public Servico(ServicoRequestDTO dados){
        this.nome = dados.nome();
        this.imagem = dados.imagem();
        this.valor = dados.valor();
        this.descricao = dados.descricao();
        this.status = dados.status();
    }

    public void atualizar(EditarServicoDTO dados){
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }
        if (dados.imagem() != null){
            this.imagem = dados.imagem();
        }
        if (dados.valor() != null){
            this.valor = dados.valor();
        }
        if (dados.descricao() != null){
            this.descricao = dados.descricao();
        }
        if (dados.status() != this.status){
            this.status = dados.status();
        }
    }
}

