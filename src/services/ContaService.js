const ContaController = require('../controllers/ContaController');
const ContaRepository = require('../repository/ContaRepository');

function montarConta(request) {
    const conta = {
        descricao: request.descricao,
        dataCompetencia: request.dataCompetencia,
        dataVencimento: request.dataVencimento,
        valor: request.valor,
        dataPagamento: request.dataPagamento,
        valorPago: request.valorPago
    }
    return conta;
}

function validarConta(conta) {
    let response = { error: [], result: {} };
    if (!conta.descricao.length)
        response.error.push("O campo Descrição deve ser informado")

    if (!conta.dataCompetencia.length)
        response.error.push("O campo Data da competência deve ser informado")

    if (!conta.dataVencimento.length)
        response.error.push("O campo Data do vencimento deve ser informado")

    if (!conta.valor.length)
        response.error.push("O campo Valor deve ser informado")

    return response

}

module.exports = {

    listar: async (request) => {
        let response = { error: '', result: [] };
        const contas = await ContaRepository.findAll(request.body);

        for (let i in contas) {
            response.result.push({
                id: contas[i].id,
                descricao: contas[i].descricao,
                dataCompetencia: contas[i].dataCompetencia,
                dataVencimento: contas[i].dataVencimento,
                valor: contas[i].valor,
                dataPagamento: contas[i].dataPagamento,
                valorPago: contas[i].valorPago

            });
        }
        ContaRepository.findAll();

        return response;
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

        if (retornoValidacao.error.length) {
            return retornoValidacao
        }

        ContaRepository.save(conta);

        response.result = "Cadastro realizado com sucesso"
        return response
    },

    alterar: async (id, descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago) => {
        let response = { error: [], result: {} };
        const conta = await ContaRepository.change(id, descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago);

        if (id && descricao && dataCompetencia && dataVencimento && valor && dataPagamento && valorPago) {

            response.result = "Alteração realizada com sucesso"

        } else {
            response.error = "Campos obrigatórios não preenchidos"
        }

        return response
    },

    excluir: async (id) => {
        await ContaRepository.delete(id);

        response = "Conta excluída com sucesso"
        return response;
    }
};