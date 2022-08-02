create table fornecedores (
    id int primary key auto_increment,
    nome varchar(100),
    cnpj_cpf varchar(14)
);


ALTER TABLE dbcrudClinics.fornecedores 
    ADD situacao INT DEFAULT 1 NULL 
    COMMENT '0 - inativo, 1 - ativo';