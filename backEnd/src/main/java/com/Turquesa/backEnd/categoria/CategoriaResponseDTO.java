package com.Turquesa.backEnd.categoria;

public record CategoriaResponseDTO(Long id, String nome) {
    public CategoriaResponseDTO(Categoria categoria){
        this(categoria.getId(), categoria.getNome());
    }
}
