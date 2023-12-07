CREATE TABLE servico_categorias (
    id BIGINT NOT NULL AUTO_INCREMENT,
    servico_id BIGINT,
    categoria_id BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (servico_id) REFERENCES servicos(id),
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);