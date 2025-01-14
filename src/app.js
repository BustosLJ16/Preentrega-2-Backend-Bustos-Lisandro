import express from 'express';
import handlebars from 'express-handlebars';
import { Server as HttpServer } from 'http';
import { Server as SocketIo } from 'socket.io';
import managerProducts from './managers/managerProducts.js';

// Importación de ManagerProducts
const productsManager = new managerProducts();

// Importación de Rutas
import viewsRouter from './routes/view.routes.js';
import productsRoutes from './routes/api/products.routes.js';
import cartRoutes from './routes/api/cart.routes.js';

// Configuro Servidor con Socket.io
const app = express();
const PORT = 8080;
const httpServer = new HttpServer(app);
const io = new SocketIo(httpServer);

// Middlewares de express
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Rutas de express
app.use('/', viewsRouter);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

// Configuración de socket.io
io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');
    
    // Emitir Lista de Productos
    const products = await productsManager.getProducts();
    socket.emit('products', products);

    // Escucho si se agrega un producto
    socket.on('newProduct', async (product) => {

        // Valido el status como booleano (Por defecto en True)
        if (typeof product.status !== 'boolean') {
            product.status = true;
        }

        // Guardo el producto
        const products = await productsManager.getProducts();
        products.push(product);
        await productsManager.saveProducts(products);
        io.emit('products', products); // Emito la lista actualizada
    });

    // Escucho la eliminacion de un producot
    socket.on('deleteProduct', async (productId) => {
        const products = await productsManager.getProducts();
        const updatedProducts = products.filter(p => p.id !== productId);
        await productsManager.saveProducts(updatedProducts);
        io.emit('products', updatedProducts); // Emito lista nueva
    });
});


httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
