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
    const {categoria, nombre, precio, delivery, descripcion} = req.body
    await db.query("INSERT INTO platos (idcategoria, nombre, precio, delivery, descripcion) VALUES (?,?,?,?,?)", [categoria, nombre, precio, delivery, descripcion])
    res.redirect('/')
  }catch(error){
    console.error(error)
  }
})

router.get('/delete/:id', async(req, res) => {
  try{
    // para obetener datos de la url req.params
    const idEliminar = req.params.id
    await db.query("DELETE FROM platos WHERE idplato = ?", [idEliminar])
    res.redirect('/')
  }catch(error){
    console.error(error)
  }
})

router.get('/edit/:id', async(req, res) =>{
  try{
    const [categorias] = await db.query("SELECT * FROM categorias")
    const [datos] = await db.query("SELECT * FROM platos WHERE idplato = ?", [req.params.id])
    res.render('edit', {categorias, plato: datos[0]})
  }catch(error){
    console.error(error)
  }
})

// ruta recibe los datos que nos envia el formulario
router.post('/edit/:id', async(req, res) =>{
  try{
    const {categoria, nombre, precio, delivery, descripcion} = req.body
    await db.query("UPDATE platos SET idcategoria = ?, nombre = ?, precio = ?, delivery = ?, descripcion = ? WHERE idplato = ?", [categoria, nombre, precio, delivery, descripcion, req.params.id])
    res.redirect('/')
  }catch(error){
    console.error(error)
  }
})

module.exports = router