const express = require('express') // framework
const router = express.Router() //gestion rutas
const db = require('../config/database') //acceso a la bd

//reuter.verbo('ruta', function_flecha)
//VERBO : router.get() / router.post()
//RUTA  : '/contenido' ... http://miweb.com/contenido
//FF    : () => {}

router.get('/', async (req, res) => {
  try{
    res.send("Hello World")
  }catch(error){
    console.log(error)
  }
})
module.exports = router