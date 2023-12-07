package com.Turquesa.backEnd.Servico;

import com.Turquesa.backEnd.categoria.Categoria;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;

public record EditarServicoDTO(Long id, String nome, String imagem, BigDecimal valor, String descricao, Boolean status, Set<Long> categorias) {
    public Set<Long> getCategorias() {
        return categorias;
    }

}
