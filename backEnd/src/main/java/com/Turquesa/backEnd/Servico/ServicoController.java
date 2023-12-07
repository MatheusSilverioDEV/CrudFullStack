package com.Turquesa.backEnd.Servico;

import com.Turquesa.backEnd.categoria.Categoria;
import com.Turquesa.backEnd.categoria.CategoriaRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/apiFood/servicos")
public class ServicoController {

    private Set<Categoria> obterCategoriasPorIds(Set<Long> categoriaIds) {
        if (categoriaIds == null) {
            return Collections.emptySet();
        }

        return categoriaIds.stream()
                .map(categoriaId -> categoriaRepository.findById(categoriaId)
                        .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada com o ID: " + categoriaId)))
                .collect(Collectors.toSet());
    }
    @Autowired
    private ServicoRepository repository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ServicoResponseDTO> Listar(){
        List<ServicoResponseDTO> servicoList = repository.findAll().stream().map(ServicoResponseDTO :: new).toList();
        return servicoList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping@Transactional
    public ResponseEntity cadastrarServico(@RequestBody ServicoRequestDTO dados){
        Servico novoServico = new Servico(dados);
        novoServico.getCategorias().addAll(obterCategoriasPorIds(dados.getCategorias()));
        repository.save(novoServico);
        return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping@Transactional
    public ResponseEntity editarServico(@RequestBody @Valid EditarServicoDTO dados){
        var servico = repository.getReferenceById(dados.id());
        servico.atualizar(dados);
        servico.getCategorias().clear();
        servico.getCategorias().addAll(obterCategoriasPorIds(dados.getCategorias()));
        repository.save(servico);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping@Transactional
    public ResponseEntity deletarServico(@RequestBody Map<String, Long> requestBody){
        Long id = requestBody.get("id");
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }






}
