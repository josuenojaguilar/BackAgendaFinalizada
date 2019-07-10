'use strict'

var Usuario = require('../models/usuario');
var Persona = require('../models/persona');


function pruebaUser(req, res){
    res.status(200).send({message: 'Usuario esta corriendo'})
}

function saveUser(req, res){
    var usuario = new Usuario();
    var params = req.body;

    if(params.primer_nombre && params.celular && params.correo){
        usuario.primer_nombre = params.primer_nombre;
        usuario.telefonos.celular = params.celular;
        usuario.correo = params.correo;

        usuario.contactos = params.contactos;

        usuario.save((err, usuarioSave)=>{
            if(err){
                res.status(500).send({message: 'Error general al guardar'});
            }else{
                if(!usuarioSave){
                    res.status(500).send({message: 'Error al guardar'});
                }else{
                    res.status(200).send({usuarioSave});
                }
            }
        })

    }else{
        res.status(200).send({message: 'Solicitud sin parametros requeridos'})
    }

}

function newContact(req, res){
    var contact = new Persona();
    var params = req.body;

    if(params.primer_nombre && params.celular && params._id){
        contact.primer_nombre = params.primer_nombre;
        contact.segundo_nombre = params.segundo_nombre;
        contact.primer_apellido = params.primer_apellido;
        contact.segundo_apellido = params.segundo_apellido;
        contact.fecha_nacimiento = params.fecha_nacimiento;
        contact.correo = params.correo;
        contact.direccion = params.direccion;

            contact.telefonos.celular = params.celular;
            contact.telefonos.casa = params.casa;
            contact.telefonos.otros = params.otros;

            Usuario.findByIdAndUpdate({_id: params._id}, {$push:{contactos: contact}}, {new: true}, (err, contactSave)=>{
                if(err){
                    res.status(500).send({message: 'Error general al guardar'});
                }else{
                    if(!contactSave){
                        res.status(500).send({message: 'Error al guardar'});
                    }else{
                        res.status(200).send({contactSave});
                    }
                }
            })
    }else{
        res.status(200).send({message: 'Solicitud sin parametros necesarios'});
    }
}

function login(req, res){
    var params = req.body
    var correo = params.correo;

    if(correo){
        Usuario.findOne({correo: correo}, (err, user)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else{
                if(!user){
                    res.status(404).send({message: 'El usuario no existe'});
                }else{
                    res.status(200).send({user});
                }
            }
        });
    }else{
        res.status(500).send({message: 'Solicitud sin parametros necesarios'});
    }
}

function searchContacts(req, res){
    var params = req.body;
    var userId = params.id;

    if(userId){
        Usuario.findOne({_id: userId}, (err, contactos)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else{
                if(!contactos){
                    res.status(500).send({message: 'Usuario inexistente'});
                }else{
                    res.status(200).send({contactos});
                }
            }
        });
    }else{
        res.status(404).send({message: 'Solicitud sin parámetros necesarios'});
    }
    
}

module.exports = {
    pruebaUser,
    saveUser,
    newContact,
    login,
    searchContacts
}