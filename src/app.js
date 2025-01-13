import express from 'express'
import handlebars from 'express-handlebars'
import { Server as HttpServer } from 'http'
import { Server as SocketIo } from 'socket.io';
import managerProducts from './managers/managerProducts.js';

// Importación de ManagerProducts
const productsManager = new managerProducts();

// Importación de Rutas
import viewsRouter from './routes/view.routes.js'
import productsRoutes from './routes/api/products.routes.js';
import cartRoutes from './routes/api/cart.routes.js';

// Configuro Servidor con Socket.io
const app = express();
const httpServer = new HttpServer(app);
const io = new SocketIo(httpServer)

// Middlewares de express
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// Configuración de Handlebars
app.engine('hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', 'hbs')
app.set('views', 'src/views')

// Rutas de express
app.use('/', viewsRouter)
app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)

// Configuración del servidor con Socket.Io
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
});

httpServer.listen(8080, () => {
    console.log('Escuchando en puerto 8080');
})