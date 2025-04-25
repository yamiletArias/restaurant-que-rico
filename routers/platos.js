const express = require('express')
const router = express.Router()
const db = require('../config/database')//acceso a la db


//router.verbo('ruta', function_flecha)
//Router.get() /router.post()
//RUTA   : contenido

router.get('/', async (req, res) => {
  try{
    const consulta = `
    SELECT 
      P.idplato,
      C.categoria,
      P.nombre,
      P.precio,
      P.delivery,
      P.descripcion
    FROM platos P
      INNER JOIN categorias C ON P.idcategoria = C.idcategoria`
    const [platos] = await db.query(consulta)
    res.render('index', { platos })
  }catch(error){
    console.error(error)
  }
})

// ruta de acceso a la vista creacion (formulario)
router.get('/create', async(req, res) =>{
  try{
    const[categorias] = await db.query("SELECT * FROM categorias")
    res.render('create', {categorias})
  }catch(error){
    console.error(error)
  }
})

// ruta recibe los datos que nos envia el formulario
router.post('/create', async(req, res) =>{
  try{
    res.send("GUARDADO")
  }catch(error){
    console.error(error)
  }
})

module.exports = router