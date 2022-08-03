const FornecedoresController = require('../controllers/FornecedoresController');
const FornecedoresRepository = require('../repository/FornecedoresRepository');


function montarCadastro(request) {
    const fornecedor = {
        nome: request.nome,
        cnpj_cpf: request.cnpj_cpf,
        situacao: request.situacao
    }
    return fornecedor;
}


function validarCadastro(fornecedor) {
    let response = { error: [], result: {} };

    if (!fornecedor.nome || !fornecedor.nome.length)
        response.error.push("O campo Nome deve ser informado")

    if (!fornecedor.cnpj_cpf || !fornecedor.cnpj_cpf.length)
        response.error.push("O campo CNPJ_CPF deve ser informado")

    if (!fornecedor.situacao || !fornecedor.situacao.length)
        response.error.push("O campo Situação deve ser informado")

    return response
}

module.exports = {

    listar: async () => {
        return await FornecedoresRepository.findAll();
    },

    visualizar: async (id) => {
        const fornecedor = await FornecedoresRepository.findById(id);

        if (fornecedor)
            return fornecedor;

    },

    cadastrar: async (request) => {
        let response = { error: [], result: {} };
        const fornecedor = montarCadastro(request)

        const retornoValidacao = validarCadastro(fornecedor)

        if (retornoValidacao.error.length) {
            return retornoValidacao
        }

        FornecedoresRepository.save(fornecedor);

        response.result = "Cadastro realizado com sucesso"
        return response
    },

    alterar: async (id, nome, cnpj_cpf, situacao) => {
        let response = { error: '', result: {} };
        
        await FornecedoresRepository.change(id, nome, cnpj_cpf, situacao);

        if (id && nome && cnpj_cpf && situacao) {

            response.result = "Alteração realizada com sucesso"

        } else {
            response.error = "Campos obrigatórios não preenchidos"
        }
        
        return response
    },

    excluir: async (id) => {
        await FornecedoresRepository.delete(id);

        response = "Cadastro excluída com sucesso"
        return response;
    }
};