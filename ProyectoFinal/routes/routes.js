const express = require("express")
const router = express.Router()
const cors = require('cors')

router.use(cors())


const db = require('../database/db')

db.mysqlConnection.connect((err) => {
    if (!err)
        console.log('Conexión PFinal DB');
    else
        console.log('Error de conexión a la base de datos\n Error: ' + JSON.stringify(err, undefined, 2));

})

router.post('/ObtenerPaisesInit', function(req, res, next) {
    db.mysqlConnection.query('CALL ObtenerPaisesInit(?)', [req.body.tipo],
    (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})
router.post('/ObtenerCategoriasInit', function(req, res, next) {
    db.mysqlConnection.query('CALL ObtenerCategoriasInit(?)', [req.body.tipo],
    (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})
//GRAFICOS  GENERALES
//ObtenerTipo
router.get('/ObtenerTipoTotal', function(req, res, next) {
    db.mysqlConnection.query('CALL ObtenerTipoTotal()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//ObtenerCategorias
router.get('/ObtenerCategoriasTotal', function(req, res, next) {
    db.mysqlConnection.query('CALL  ObtenerCategoriasTotal()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//ObtenerPaisTotal
router.get('/ObtenerPaisTotal', function(req, res, next) {
    db.mysqlConnection.query('CALL  ObtenerPaisTotal()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//ObtenerYearTotal
router.get('/ObtenerYearTotal', function(req, res, next) {
    db.mysqlConnection.query('CALL  ObtenerYearTotal()', (err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

//GRAFICOS FILTROS 
router.post('/ObtenerClasificacionFil', function(req, res, next) {
    console.log(req.body);
    db.mysqlConnection.query('CALL  ObtenerClasificacionFil(?,?,?,?,?)', [req.body.tipo,  req.body.pais,req.body.categoria, req.body.duracion,req.body.actor],(err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

router.post('/ObtenerYearFil', function(req, res, next) {
    db.mysqlConnection.query('CALL  ObtenerYearFil(?,?,?,?,?)', [req.body.tipo, req.body.pais, req.body.categoria, req.body.duracion,req.body.actor],(err, row, fields) => {
        if (!err){
            res.send(row);
            console.log(row[0]);}
        else
            console.log(err);
    })
})



//ARBOLES 
//ObtenerPaisCategArbol
router.post('/ObtenerPaisCategArbol', function(req, res, next) {
    db.mysqlConnection.query('CALL ObtenerPaisCategArbol(?,?)', [req.body.tipo, req.body.pais], (err, row, fields) => {
        if (!err) {

            var arbolData = [{
                    "name": " ",
                    "children": " "
                }
            ]
            var i = 0,
                k = 0
            var len = row[0].length
            var consulta = []
            consulta = row[0]

            //asignamos pais como primer id 
            console.log(consulta[0]['pais'])
            arbolData[0]['name'] =consulta[0]['pais'] 
            console.log(arbolData)
            // for (i = 0; i < arbolData.length; i++) {
            //     for (k = 0; k < len; k++) {
                    
            //         if (consulta[k]['categoria'] in arbolData) {
            //             continue
            //         }
            //         else{
            //             arbolData[0]['children'] = consulta[k]['categoria']
            //         }
            //     }
            // }
            res.send(arbolData);
        } else
            console.log(err);
    })
})

module.exports = router