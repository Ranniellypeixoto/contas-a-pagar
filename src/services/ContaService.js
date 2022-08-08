const ContaController = require('../controllers/ContaController');
const ContaRepository = require('../repository/ContaRepository');

function montarConta(request) {
    const conta = {
        descricao: request.descricao,
        dataCompetencia: request.dataCompetencia,
        dataVencimento: request.dataVencimento,
        valor: request.valor,
        dataPagamento: request.dataPagamento,
        desconto: request.desconto,
        juros: request.juros,
        multa: request.multa,
        valorPago: request.valorPago,
        fornecedorId: request.fornecedorId
    }
    return conta;
}

function compararDatas(conta) {
    let response = { error: [], result: {} };

    const dataDaCompetencia = new Date(conta.dataCompetencia);
    const dataDeVencimento = new Date(conta.dataVencimento);
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    dataAtual.setHours(dataAtual.getHours() - 3)

    if (dataDaCompetencia > dataAtual) {
        response.error.push("Data de competência não pode ser superior a data atual")
    }
    if (dataDeVencimento < dataDaCompetencia) {
        response.error.push("Data de vencimento não pode ser inferior a data de competência")
    }

    return response
}

function validarConta(conta) {
    let response = { error: [], result: {} };

    if (!conta.descricao || !conta.descricao.length)
        response.error.push("O campo Descrição deve ser informado")

    if (!conta.dataCompetencia || !conta.dataCompetencia.length)
        response.error.push("O campo Data da competência deve ser informado")

    if (!conta.dataVencimento || !conta.dataVencimento.length)
        response.error.push("O campo Data do vencimento deve ser informado")

    if (!conta.valor || !conta.valor.length)
        response.error.push("O campo Valor deve ser informado")

    if (!conta.fornecedorId)
        response.error.push("O campo Fornecedor deve ser informado")

    return response
}

module.exports = {

    listar: async () => {
        return await ContaRepository.findAll();
    },

    visualizar: async (id) => {
        const conta = await ContaRepository.findById(id);

        if (conta)
            return conta;

    },

    cadastrar: async (request) => {
        let response = { error: [], result: {} };
        const conta = montarConta(request)

        const retornoValidacao = validarConta(conta)
        const retornoCompararDatas = compararDatas(conta)

        if (retornoValidacao.error.length) {
            return retornoValidacao
        } else if (retornoCompararDatas.error.length) {
            return retornoCompararDatas
        }

        ContaRepository.save(conta);

        response.result = "Cadastro realizado com sucesso"
        return response
    },

    alterar: async (id, request) => {
        let response = { error: [], result: {} };
        const conta = montarConta(request)

        const retornoValidacao = validarConta(conta)
        const retornoCompararDatas = compararDatas(conta)

        if (retornoValidacao.error.length) {
            return retornoValidacao
        } else if (retornoCompararDatas.error.length) {
            return retornoCompararDatas
        }

        ContaRepository.update(id, conta);

        response.result = "Alteração realizada com sucesso"
        return response
    },

    excluir: async (id) => {
        await ContaRepository.delete(id);

        response = "Conta excluída com sucesso"
        return response;
    },

    totalContasPorMesAno: async (periodo) => {
        const contas = await ContaRepository.totalContasPorMesAno(periodo);
        const response  = {periodo, total: 0}
        contas.forEach(conta => {
            response.total += parseFloat(conta.valor)
        });
        return response;
    },
};