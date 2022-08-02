create table contas (
    id int primary key auto_increment,
    descricao varchar(100),
    dataCompetencia DATE,
    dataVencimento DATE,
    valor varchar(10),
    dataPagamento DATE,
    desconto varchar(6),
    juros varchar(3),
    valorPago varchar(10)
);

ALTER TABLE contas 
    ADD fornecedorId INT NULL;

ALTER TABLE contas 
    ADD CONSTRAINT conta_fornecedor_FK 
    FOREIGN KEY (fornecedorId) 
    REFERENCES fornecedores(id);