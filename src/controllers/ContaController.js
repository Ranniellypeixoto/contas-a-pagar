const ContaService = require('../services/ContaService');

module.exports = {
    listar: async (request, res) => {
        const fornecedor = await ContaService.listar(request.body);
        res.json(fornecedor);
    },

    visualizar: async (request, res) => {
        let id = request.params.id;
        const fornecedor = await ContaService.visualizar(id);
        res.json(fornecedor);
    },

    cadastrar: async (request, res) => {
        const fornecedor = await ContaService.cadastrar(request.body);
        res.json(fornecedor);
    },

    alterar: async (request, res) => {
        const id = request.params.id;
        const { descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago } = request.body;
        const fornecedor = await ContaService.alterar(id, descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago);
        res.json(fornecedor);
        
    },

    excluir: async (req, res) => {
        const fornecedor = await ContaService.excluir(req.params.id);
        res.json(fornecedor);
    }
}
