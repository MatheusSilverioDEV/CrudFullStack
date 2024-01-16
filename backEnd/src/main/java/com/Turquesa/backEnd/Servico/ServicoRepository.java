package com.Turquesa.backEnd.servico;

import com.Turquesa.backEnd.categoria.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

    List<Servico> findByCategorias(Categoria categoria);

}
