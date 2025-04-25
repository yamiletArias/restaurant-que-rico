// aceesiendo a los modulos / herramientas
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

//Router = enrutador
const categoriasRouter = require('./routers/categorias')
const platosRouter = require('./routers/platos')

//Middleware = canal de comunicacion (request > process > result)
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

//moto de plantilla
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Rutas
app.use('/', platosRouter)
//app.use('/categorias', categoriasRouter)

//Iniciamos el servidor
app.listen(3000, () =>{
  console.log('servidor iniciado en http://localhost:3000')
})