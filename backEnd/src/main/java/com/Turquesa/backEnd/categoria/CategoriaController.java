package com.Turquesa.backEnd.categoria;

import com.Turquesa.backEnd.Servico.Servico;
import com.Turquesa.backEnd.Servico.ServicoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/apiFood/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaRepository repository;

    @Autowired
    private ServicoRepository servicoRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<CategoriaResponseDTO> Listar(){
        List<CategoriaResponseDTO> categoriaList = repository.findAll().stream().map(CategoriaResponseDTO :: new).toList();
        return categoriaList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping@Transactional
    public ResponseEntity cadastrarCategoria(@RequestBody @Valid CategoriaRequestDTO dados){
        Categoria novaCategoria = new Categoria(dados);
        repository.save(novaCategoria);
        return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping@Transactional
    public ResponseEntity atualizarCategoria(@RequestBody @Valid EditarCategoriaDTO dados){
        var categoria = repository.getReferenceById(dados.id());
        categoria.atualizar(dados);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping@Transactional
    public ResponseEntity deletarCategoria(@RequestBody Map<String, Long> requestbody) {
        Long id = requestbody.get("id");

        Categoria categoria = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada com o ID: " + id));

        List<Servico> servicos = servicoRepository.findByCategorias(categoria); // Removendo categoria dos serviços que está associada
        for (Servico servico : servicos) {
            servico.getCategorias().remove(categoria);
        }

        repository.deleteById(id);

        return ResponseEntity.ok().build();
    }
}


