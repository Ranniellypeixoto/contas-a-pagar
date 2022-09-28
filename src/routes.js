const express = require('express');
const router = express.Router();

// Contas
const ContaController = require('./controllers/ContaController');
router.get('/contas', ContaController.listar);
router.get('/contas/:id', ContaController.visualizar);
router.post('/contas', ContaController.cadastrar);
router.put('/contas/:id', ContaController.alterar);
router.delete('/contas/:id', ContaController.excluir);
router.get('/contas/total/:periodo', ContaController.totalContasPorMesAno);

// Fornecedores
const FornecedoresController = require('./controllers/FornecedoresController');
router.get('/fornecedores', FornecedoresController.listar);
router.get('/fornecedores/:id', FornecedoresController.visualizar);
router.post('/fornecedores', FornecedoresController.cadastrar);
router.put('/fornecedores/:id', FornecedoresController.alterar);
router.delete('/fornecedores/:id', FornecedoresController.excluir);

module.exports = router;