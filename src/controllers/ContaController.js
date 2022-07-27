const { buscarUm } = require('../services/ContaService');
const ContaService = require('../services/ContaService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };

        let contas = await ContaService.buscarTodos();

        for (let i in contas) {
            json.result.push({
                id: contas[i].id,
                descricao: contas[i].descricao,
                dataCompetencia: contas[i].dataCompetencia,
                dataVencimento: contas[i].dataVencimento,
                valor: contas[i].valor,
                dataPagamento: contas[i].dataPagamento,
                valorPago: contas[i].valorPago

            });
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        let descricao = req.params.descricao;
        let conta = await ContaService.buscarUm(descricao);

        if (conta) {
            json.result = conta;
        }
        res.json(json);
    },
    
    inserir: async(req, res)=> {
        let json = {error:'', result:{}};

        const {descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago} = req.body; 
     console.table(req)
        if(descricao && dataCompetencia && dataVencimento && valor && dataPagamento && valorPago){
            let Contaid = await ContaService.inserir(descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago);
            json.result = {
                id: Contaid,
                descricao,
                dataCompetencia,
                dataVencimento,
                valor,
                dataPagamento,
                valorPago
            };
        }else{
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        const id = req.params.id;
        const {descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago} = req.body; 

        if(id && descricao && dataCompetencia && dataVencimento && valor && dataPagamento && valorPago){
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
        }else{
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await ContaService.excluir(req.params.id);

        res.json(json);

    }
}
