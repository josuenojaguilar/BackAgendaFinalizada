'use strict'

var expres = require('express');
var UsuarioController = require('../controllers/usuario');

var api = expres.Router(); 

api.get('/prueba', UsuarioController.pruebaUser);
api.post('/saveUser', UsuarioController.saveUser);
api.post('/newContact', UsuarioController.newContact);
api.post('/login', UsuarioController.login);
api.post('/searchContacts', UsuarioController.searchContacts);

module.exports = api;