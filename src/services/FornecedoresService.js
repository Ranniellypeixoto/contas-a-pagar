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
    if (fornecedorEncontrado) {
        response.error.push(`O CNPJ/CPF informado já pertence a um fornecedor cadastrado de nome ${fornecedorEncontrado.nome}`)
    }

    if (!fornecedor.situacao || !fornecedor.situacao.length)
        response.error.push("O campo Situação deve ser informado")

    return response
}

async function validarCadastroUpdate(fornecedor) {
    let response = { error: [], result: {} };

    if (!fornecedor.nome || !fornecedor.nome.length)
        response.error.push("O campo Nome deve ser informado")

    if (!fornecedor.cnpj_cpf || !fornecedor.cnpj_cpf.length)
        response.error.push("O campo CNPJ/CPF não foi informado")

    if (!validarCNPJCPF(fornecedor.cnpj_cpf))
        response.error.push("O CNPJ/CPF informado é inválido")

    if (!fornecedor.situacao || !fornecedor.situacao.length)
        response.error.push("O campo Situação deve ser informado")

    return response
}

function validarCNPJCPF(cnpj_cpf) {
    if (cnpj_cpf.length == 14) {
        return validarCNPJ(cnpj_cpf)
    }

    return validarCPF(cnpj_cpf)
}

function validarCNPJ(cnpj) {

    if (cnpj.length != 14)
        return false;

    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

function validarCPF(cpf) {
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

async function fornecedorExistente(cnpj_cpf) {
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

    alterar: async (id, request) => {
        let response = { error: [], result: {} };
        const fornecedor = montarCadastro(request)

        const retornoValidacao = await validarCadastroUpdate(fornecedor)

        if (retornoValidacao.error.length) {
            return retornoValidacao
        }

        FornecedoresRepository.update(id, fornecedor);

        response.result = "Alteração realizada com sucesso"
        return response
    },

    excluir: async (id) => {
        await FornecedoresRepository.delete(id);

        response = "Cadastro excluída com sucesso"
        return response;
    }
};