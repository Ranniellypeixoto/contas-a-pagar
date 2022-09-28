const ContaService = require('../services/ContaService');

module.exports = {
    listar: async (request, res) => {
        const conta = await ContaService.listar(request.body);
        res.json(conta);
    },

    visualizar: async (request, res) => {
        let id = request.params.id;
        const conta = await ContaService.visualizar(id);
        res.json(conta);
    },

    cadastrar: async (request, res) => {
        const conta = await ContaService.cadastrar(request.body);
        res.json(conta);
    },

    alterar: async (request, res) => {
        const id = request.params.id;
        const conta = await ContaService.alterar(id, request.body);
        res.json(conta);
    },

    excluir: async (req, res) => {
        const conta = await ContaService.excluir(req.params.id);
        res.json(conta);
    },

    totalContasPorMesAno: async (request, res) => {
        let periodo = request.params.periodo;
        const total = await ContaService.totalContasPorMesAno(periodo);
        res.json(total);
    },
}
