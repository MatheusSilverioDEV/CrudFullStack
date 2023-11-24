package com.Turquesa.backEnd.Servico;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Turquesa/servicos")
public class ServicoController {

    @Autowired
    private ServicoRepository repository;

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
        repository.save(novoServico);
        return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping@Transactional
    public ResponseEntity editarServico(@RequestBody @Valid EditarServicoDTO dados){
        var servico = repository.getReferenceById(dados.id());
        servico.atualizar(dados);
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
