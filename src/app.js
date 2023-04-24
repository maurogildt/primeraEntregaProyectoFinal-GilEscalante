import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import productsRoutes from './routes/products.router.js'
import cartsRoutes from './routes/carts.router.js'

const app = express()

app.use(express.static(`${__dirname}/`))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')

app.use('/api/products',productsRoutes)
app.use('/api/carts',cartsRoutes)

app.listen(8080,()=>(console.log('Listening')))