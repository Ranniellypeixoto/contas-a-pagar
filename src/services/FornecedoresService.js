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


async function validarCadastro(fornecedor) {
    let response = { error: [], result: {} };

    if (!fornecedor.nome || !fornecedor.nome.length)
        response.error.push("O campo Nome deve ser informado")

    if (!fornecedor.cnpj_cpf || !fornecedor.cnpj_cpf.length)
        response.error.push("O campo CNPJ/CPF não foi informado")

    if (!validarCNPJCPF(fornecedor.cnpj_cpf))
        response.error.push("O CNPJ/CPF informado é inválido")

    const fornecedorEncontrado = await fornecedorExistente(fornecedor.cnpj_cpf)    
    if(fornecedorEncontrado){
        response.error.push(`O CNPJ/CPF informado já pertence a um fornecedor cadastrado de nome ${fornecedorEncontrado.nome}`)
    }

    if (!fornecedor.situacao || !fornecedor.situacao.length)
        response.error.push("O campo Situação deve ser informado")

    return response
}

function validarCNPJCPF(cnpj_cpf){
    if (cnpj_cpf.length == 14) {
        return validarCNPJ(cnpj_cpf)
    }

    return validarCPF(cnpj_cpf)
}

function validarCNPJ(cnpj){

}

function validarCPF(cpf){
    if (!cpf) {
        return false
    }

    var numeros = cpf.substring(0, 9);
    var digitos = cpf.substring(9);

    var soma = 0;
    for (var i = 10; i > 1; i--) {
        soma += numeros.charAt(10 - i) * i;
    }

    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado != digitos.charAt(0)) {
        return false;
    }

    soma = 0;
    numeros = cpf.substring(0, 10);

    for (var k = 11; k > 1; k--) {
        soma += numeros.charAt(11 - k) * k;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado != digitos.charAt(1)) {
        return false;
    }

    return true;
}

async function fornecedorExistente(cnpj_cpf){
    const fornecedor = await FornecedoresRepository.findByCnpjCpf(cnpj_cpf);
    return fornecedor;
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

        const retornoValidacao = await validarCadastro(fornecedor)

        if (retornoValidacao.error.length) {
            return retornoValidacao
        }

        FornecedoresRepository.save(fornecedor);

        response.result = "Cadastro realizado com sucesso"
        return response
    },

    /*
    TODO esse método é similar ao método cadastrar, da mesma forma que foi feito 
    em no cadastro e alterar uma conta
    */
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