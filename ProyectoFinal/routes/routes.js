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
    db.mysqlConnection.query('CALL  ObtenerClasificacionFil(?,?,?,?,?,?,?)', [req.body.tipo,  req.body.categoria,req.body.pais, req.body.duracion,req.body.actor, req.body.fechaI, req.body.fechaF],(err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

router.post('/ObtenerYearFil', function(req, res, next) {
    db.mysqlConnection.query('CALL  ObtenerYearFil(?,?,?,?,?,?,?)', [req.body.tipo, req.body.categoria, req.body.pais, req.body.duracion,req.body.actor, req.body.fechaI, req.body.fechaF],(err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})
router.post('/ObtenerTituloYear', function(req, res, next) {

    db.mysqlConnection.query('CALL  ObtenerTituloYear(?,?,?,?,?,?)', [req.body.tipo, req.body.categoria, req.body.pais, req.body.duracion,req.body.actor, req.body.fecha],(err, row, fields) => {
        if (!err)
            res.send(row);
        else
            console.log(err);
    })
})

router.post('/ObtenerTituloClasificacion', function(req, res, next) {
    db.mysqlConnection.query('CALL ObtenerTituloClasificacion(?,?,?,?,?,?,?,?)', [req.body.tipo, req.body.categoria, req.body.pais, req.body.duracion,req.body.actor, req.body.fechaI, req.body.fechaF, req.body.clasificacion],(err, row, fields) => {
        if (!err)
            res.send(row);
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
                    "children": []
                }
            ]
            var i = 0,
                k = 0
            var len = row[0].length
            var consulta = []
            consulta = row[0]
            listacategorias = []
            listatitulocat =[]
            listaelenco = []

            //asignamos pais como primer id 
            arbolData[0]['name'] =consulta[0]['pais'] 
            //hacemos un array con todas las categorias
            for (i = 0; i <consulta.length; i++) {
                //todas las categorias
                //console.log(consulta[i]['categoria'])
                if(listacategorias.includes(consulta[i]['categoria'])){
                    continue;
                }
                else{
                    listacategorias.push(consulta[i]['categoria'])
                    
                }    
            }
            //metemos las categorias en el json
            for (k = 0; k <listacategorias.length; k++) {
                arbolData[0]['children'].push({name: listacategorias[k], children:[]})
            }
            //hacemos una lista de titulos por categoria
            //llenamos la lista de arrays vacios 
            var l
            for (l = 0; l <listacategorias.length; l++) {
                listatitulocat.push([])
            }
            //llenamos el array con los titulos
            var j=0, h=0
            for (j = 0; j <consulta.length; j++) {
                for(h = 0; h <listatitulocat.length; h++){
                    if(consulta[j]['categoria'] == listacategorias[h]){
                        listatitulocat[h].push(consulta[j]['titulo'])
                    }

                }
            }
            //asignamos los titulos a las categorias del json
            var m = 0,n=0
            for (m = 0; m <listacategorias.length; m++) {
                for (n= 0; n <listatitulocat[m].length; n++){
                    arbolData[0]['children'][m]['children'].push({name:listatitulocat[m][n],children:[]})

                }
            }
            //creamos lista de elenco 
            var s
            for (s = 0; s <listacategorias.length; s++) {
                listaelenco.push([])
            }
            var p=0, q=0
            for (p = 0; p <consulta.length; p++) {
                for(q = 0; q <listatitulocat.length; q++){
                    if(consulta[p]['categoria'] == listacategorias[q]){
                        listaelenco[q].push(consulta[p]['director'])
                        //aqui se puede cambiar por elenco
                    }

                }
            }
            console.log(listaelenco)
            //asignamos elenco a cada titulo del json 
            var t = 0,u=0,v=0
            for (t = 0; t <listacategorias.length; t++) {
                for (u= 0; u <listatitulocat[t].length; u++){
                    // arbolData[0]['children'][m]['children'].push({name:listatitulocat[m][n],children:[]})

                    arbolData[0]['children'][t]['children'][u]['children'].push({name:listaelenco[t][u]})
                     
                }
            }            

            console.log('arbol con cat y titulos y elenco')
            console.log(arbolData)

            res.send(arbolData);
        } else
            console.log(err);
    })
})

module.exports = router