package com.Turquesa.backEnd.Servico;

import com.Turquesa.backEnd.categoria.Categoria;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;

public record ServicoResponseDTO(Long id, String nome, String imagem, BigDecimal valor, String descricao, Boolean status, Set<Long> categorias) {

    public ServicoResponseDTO(Servico servico){
        this(servico.getId(), servico.getNome(), servico.getImagem(), servico.getValor(), servico.getDescricao(), servico.getStatus(), servico.getCategorias().stream().map(Categoria::getId).collect(Collectors.toSet()) );
    }
}
