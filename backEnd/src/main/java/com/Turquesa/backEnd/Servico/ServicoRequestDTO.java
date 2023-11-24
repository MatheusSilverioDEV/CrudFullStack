package com.Turquesa.backEnd.Servico;

import java.math.BigDecimal;

public record ServicoRequestDTO(String nome, String imagem, BigDecimal valor, String descricao, Boolean status) {
}
