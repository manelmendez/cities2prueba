/**
 * Created by manel on 14/3/16.
 */
var express = require('express');
var router = express.Router();
var http = require("http");
var crypto = require('crypto');
var rsa = require('../rsa/rsa-bignum.js');
var bignum = require('bignum');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
//var hash = crypto.createHash('md5').update(data).digest('hex');

//POST - Reenviar suma a server
router.post('/sumar', function (require, result) {
    console.log('POST /reenvio suma');
    console.log(require.body);
    var data = JSON.stringify(require.body);
    var options = {
        host: 'localhost',
        port: 8000,
        path: '/operaciones/sumar',
        method: 'POST',
        json:true,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            console.log("Devuelto a TTP: " + chunk);
            result.status(200).send(chunk);
        });
    });
    req.write(data);
    req.end();
});
//POST - Reenviar resta a server
router.post ('/restar',function (require, result) {
    console.log('POST /reenvio resta');
    console.log(require.body);
    var data = JSON.stringify(require.body);
    var options = {
        host: 'localhost',
        port: 8000,
        path: '/operaciones/restar',
        method: 'POST',
        json:true,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            console.log("Devuelto a TTP: " + chunk);
            result.status(200).send(chunk);
        });
    });
    req.write(data);
    req.end();
});
    //POST - Reenviar multiplicación a server
router.post('/multiplicar',function (require, result) {
    console.log('POST /reenvio multiplicacion');
    console.log(require.body);
    var data = JSON.stringify(require.body);
    var options = {
        host: 'localhost',
        port: 8000,
        path: '/operaciones/multiplicar',
        method: 'POST',
        json:true,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            console.log("Devuelto a TTP: " + chunk);
            result.status(200).send(chunk);
        });
    });
    req.write(data);
    req.end();
});
//POST - Reenviar división a server
router.post('/dividir',function (require, result) {
    console.log('POST /reenvio division');
    console.log(require.body);
    var data = JSON.stringify(require.body);
    var options = {
        host: 'localhost',
        port: 8000,
        path: '/operaciones/dividir',
        method: 'POST',
        json:true,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            console.log("Devuelto a TTP: " + chunk);
            result.status(200).send(chunk);
        });
    });
    req.write(data);
    req.end();
});

//GET - Recibir todos los usuarios
router.post('/allusers',function (require, result){
    console.log("Cliente pide recibir users a TTP");
    console.log("1: A-->TTP: (TTP, B, M, Po) (Paso hecho en cliente)");
    console.log(require.body);
    console.log('\n');
    console.log("2: TTP-->A: (A, B, Tr, L, Ps)");
    // TTP desencripta el mensaje de A con la privada de TTP

    // coje los datos necesarios para crear los mensajes:
    var total =require.body.mensaje;
    console.log(total);
    var trozos = total.split(",");
    var a="A";
    var b=trozos[1];
    var Tr= Date.now();
    var L="L";
    var Po=trozos[2];
    var PsJSON={
        a:a,
        b:b,
        Tr:Tr,
        L:L,
        Po:Po
    };
    var Ps= PsJSON.a+','+PsJSON.b+','+PsJSON.Tr+','+PsJSON.L+','+PsJSON.Po;//debera ir encriptado por la privada del TTP (firmado)
    //cojo la publicKey y private Key de TTP
    var prikTTP = JSON.parse(localStorage.getItem("TTPprivada"));
    var pubkTTP = JSON.parse(localStorage.getItem("TTPpublica"));
    var keys= {};
    keys.publicKey = new rsa.publicKey(pubkTTP.bits, bignum(pubkTTP.n), bignum(pubkTTP.e));
    keys.privateKey = new rsa.privateKey(bignum(prikTTP.p), bignum(prikTTP.q), bignum(prikTTP.d), keys.privateKey);
    //encripto Ps con la privada
    var Psbignum = bignum.fromBuffer(new Buffer(Ps.toString()));
    var Pscrip = keys.publicKey.encrypt(Psbignum);
    var mensajeToA ={
        a:a,
        b:b,
        Tr:Tr,
        L:L,
        Ps:Pscrip.toString()
    };  //encriptado con la publica de A
    //cojo la publicKey de A
    
    //encripto el mensaje a A
    
    console.log(mensajeToA);
    console.log('\n');
    console.log("3: TTP-->B: (A, L, Po)");
    var mensajeToBJSON={
        a:a,
        L:L,
        Po:Po
    };
    var mensajeToB=mensajeToBJSON.a+','+mensajeToBJSON.L+','+mensajeToBJSON.Po;//encriptado con la publica de B
    //cojo la publicKey de B
    var pubkServer = JSON.parse(localStorage.getItem("Serverpublica"));
    var keys2= {};
    keys2.publicKey = new rsa.publicKey(pubkServer.bits, bignum(pubkServer.n), bignum(pubkServer.e));
    //encripto el mensaje a B
    //var msg = "MANEL";
    var mensajeToBbignum = bignum.fromBuffer(new Buffer(mensajeToB.toString()));
    var mensajeToBcrip = keys2.publicKey.encrypt(mensajeToBbignum);
    //
    var data = {"mensaje":mensajeToBcrip.toString()};
    console.log("Mensaje encriptado a B: ");
    console.log(data);
    var options = {
        host: 'localhost',
        port: 8000,
        path: '/server/allusers',
        method: 'POST',
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var req= http.request(options, function(res){
         res.on('data', function(chunk){
             var respuesta = JSON.parse(chunk);
             console.log('\n');
             console.log("5: TTP-->A: (A, B, Td, L, K, Pr, Pd)");
             // TTP desencripta el mensaje de B con la privada de TTP

             // coje los datos necesarios para crear el mensaje
             var Pd = {
                 a:a,
                 b:b,
                 Td:Date.now(),
                 L:respuesta.L,
                 Pr:respuesta.Pr
             };  //deberá encriptar esto con la privada de TTP (firmar)
             var mensajeFinalA = {
                 a:a,
                 b:b,
                 Td:Date.now(),
                 L:respuesta.L, //esto ya viene encriptado con la pública de A desde B
                 K:"K",
                 Pr:respuesta.Pr,
                 Pd:Pd
             };  // deberá ir encriptado con la pública de A
             console.log(mensajeFinalA);
             console.log('\n');
             result.status(200).send({data:mensajeToA, data2:mensajeFinalA});
             console.log("6: TTP-->B: (L, M)");
             // los datos los hemos desencriptado arriba, solo los cojemos y enviamos
             var mensajeFinalB = {
                 L:respuesta.L,
                 M:require.body.M
             }; // encriptado con la pública de B
             var data2 = JSON.stringify(mensajeFinalB);
             var options = {
                 host: 'localhost',
                 port: 8000,
                 path: '/server/final',
                 method: 'POST',
                 json:true,
                 headers: {
                     'Content-Type': 'application/json'
                 }
             };
             var req2 = http.request(options, function(res2) {
                 res2.on('data', function (chunk) {
                     console.log("Transmisión finalizada");
                     console.log('\n');
                 })
             });
             req2.write(data2);
             req2.end();
         });
    });
    req.write(JSON.stringify(data));
    req.end();
});
//POST - Reenviar nuevo usuario a server
router.post('/adduser',function (require, result) {
    console.log(require.body);
    console.log('\n');
    var data = JSON.stringify(require.body);
    var options = {
        host: 'localhost',
        port: 8000,
        path: '/server/adduser',
        method: 'POST',
        json:true,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            var respuesta = JSON.parse(chunk);
            console.log('\n');
            result.status(200).send(respuesta);
            });
        });
    req.write(data);
    req.end();
});
//POST - Reenviar login user a server
router.post('/login',function (require, result) {
    console.log(require.body);
    console.log('\n');
    var data = JSON.stringify(require.body);
    var options = {
        host: 'localhost',
        port: 8000,
        path: '/server/login',
        method: 'POST',
        json:true,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            console.log('\n');
            result.status(200).send(chunk);
        });
    });
    req.write(data);
    req.end();
});
module.exports = router;