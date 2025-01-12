import express from 'express'
import handlebars from 'express-handlebars'
import { Server as httpServer } from 'http'
import { Server as ServerIo } from 'socket.io';

//Importación de Rutas
import viewsRouter from './routes/view.routes.js'
import productsRoutes from './routes/api/products.routes.js';
import cartRoutes from './routes/api/cart.routes.js';

const app = express();

app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.engine('hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs')
app.set('views', 'src/views')

// Rutas de express
app.use('/', viewsRouter)
app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)

app.listen(8080, () => {
    console.log('Escuchando en puerto 8080');
})