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

//Cargar Datos
router.post('/CargarDatos', (req, res) => {
    db.mysqlConnection.query('CALL CargarDatos(?,?,?,?,?,?,?,?,?,?)', [req.body.type, req.body.title,req.body.director, req.body.cast, req.body.country, req.body.year, req.body.rate, req.body.duration,  req.body.descrip,req.body.listed], (err, row, fields) => {
        if (!err) {
            res.send(row);
        } else
            console.log(err);
    })
})

module.exports = router