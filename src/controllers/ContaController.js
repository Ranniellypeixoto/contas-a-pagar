const { visualizar } = require('../services/ContaService');
const ContaService = require('../services/ContaService');

module.exports = {
    listar: async (request, res) => {
        const conta = await ContaService.listar(request.body);
        res.json(conta);
    },

    visualizar: async (request, res) => {
        let id = request.params.id;
        const conta = await ContaService.visualizar(request.id);
        res.json(conta);
    },

    cadastrar: async (request, res) => {
        const conta = await ContaService.cadastrar(request.body);
        res.json(conta);
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} };

        const id = req.params.id;
        const { descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago } = req.body;

        if (id && descricao && dataCompetencia && dataVencimento && valor && dataPagamento && valorPago) {
            await ContaService.alterar(id, descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago);
            json.result = {
                id,
                descricao,
                dataCompetencia,
                dataVencimento,
                valor,
                dataPagamento,
                valorPago
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    excluir: async (req, res) => {
        let json = { error: '', result: {} };

        await ContaService.excluir(req.params.id);

        res.json(json);

    }
}
