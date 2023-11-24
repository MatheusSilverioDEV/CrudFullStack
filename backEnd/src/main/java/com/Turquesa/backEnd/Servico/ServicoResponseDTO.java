package com.Turquesa.backEnd.Servico;

import java.math.BigDecimal;

public record ServicoResponseDTO(Long id, String nome, String imagem, BigDecimal valor, String descricao, Boolean status) {

    public ServicoResponseDTO(Servico servico){
        this(servico.getId(), servico.getNome(), servico.getImagem(), servico.getValor(), servico.getDescricao(), servico.getStatus());
    }
}
