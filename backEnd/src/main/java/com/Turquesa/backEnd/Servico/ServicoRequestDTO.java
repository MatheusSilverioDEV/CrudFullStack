package com.Turquesa.backEnd.servico;

import java.math.BigDecimal;
import java.util.Set;

public record ServicoRequestDTO(String nome, String imagem, BigDecimal valor, String descricao, Boolean status, Set<Long> categorias) {
    public Set<Long> getCategorias() {
        return this.categorias;
    }
}
