CREATE TABLE servicos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    imagem TEXT NULL,
    valor DECIMAL(10,2),
    descricao VARCHAR(500),
    status TINYINT not NULL,
    PRIMARY KEY (id)
);
