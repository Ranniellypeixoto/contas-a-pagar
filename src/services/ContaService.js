const db = require('../db');

module.exports = {

    listarTodos: () =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM contas', (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        });
    },

    listarUm: (id) => {
        return new Promise((aceito,rejeitado)=>{

            db.query('SELECT * FROM contas WHERE id = ?', [id],(error, results)=>{
                if(error) { rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false)
                }
            });
        });
    },

    cadastrar: (descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago) => {
        return new Promise((aceito,rejeitado)=>{

            db.query('INSERT INTO contas (descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago) VALUES (?, ?, ?, ?, ?, ?)',
                [descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago],
                (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertid);
                }
            );
      });
    },

    alterar: (id, descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago) => {
        return new Promise((aceito,rejeitado)=>{

            db.query('UPDATE contas SET descricao = ?, dataCompetencia = ?, dataVencimento = ?, valor = ?, dataPagamento = ?, valorPago = ? WHERE id = ?',[descricao, dataCompetencia, dataVencimento, valor, dataPagamento, valorPago, id],
                (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
      });
    },
    
    excluir: (id) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('DELETE FROM contas WHERE id = ?',[id], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        });
    }
};