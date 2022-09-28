const FornecedoresService = require('../services/FornecedoresService');


module.exports = {
    listar: async (request, res) => {
        const fornecedor = await FornecedoresService.listar(request.body);
        res.json(fornecedor);
    },

    visualizar: async (request, res) => {
        let id = request.params.id;
        const fornecedor = await FornecedoresService.visualizar(id);
        res.json(fornecedor);
    },

    cadastrar: async (request, res) => {
        const fornecedor = await FornecedoresService.cadastrar(request.body);
        res.json(fornecedor);
    },

    alterar: async (request, res) => {
        const id = request.params.id;
        const fornecedor = await FornecedoresService.alterar(id, request.body);
        res.json(fornecedor);
        
    },

    excluir: async (req, res) => {
        const fornecedor = await FornecedoresService.excluir(req.params.id);
        res.json(fornecedor);
    }
}
