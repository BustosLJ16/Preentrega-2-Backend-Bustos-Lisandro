import { Router } from "express";
import managerProducts from '../../managers/managerProducts.js'

const productsRoutes = Router();
const productsManager = new managerProducts();

// Metodos de ProductsRoutes (Get, Post, Put y Delete)

// Limite aplicando QueryParams (Get)
productsRoutes.get('/', async (req, res) => {
    const limit = +req.query.limit;
    const productsList = await productsManager.getProducts();
    if(isNaN(limit) || !limit){
        return res.send({productsList});
    }
    const productsListLimited = productsList.slice(0, limit)
    res.send({productsList: productsListLimited});
})

// Obtener producto por su ID (Get)
productsRoutes.get('/:pid', async (req, res) => {
    const pId = +req.params.pid;
    const product = await productsManager.getSingleProductsById(pId);
    if(!product){
        return res.status(404).send({status: 'error', message: `Lo sentimos. Hubo un error al buscar el producto con ID: ${pId}.`});
    }
    res.send({product});
})

// Crear un Nuevo Producto (Post)
productsRoutes.post('/', async (req, res) => {
    try {
        const product = req.body;

        // Chequeo de los campos
        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category', 'thumbnail'];
        const missingFields = requiredFields.filter(field => !product[field]);
        if(missingFields.length > 0){
            return res.status(400).send({status: 'error', message: `Lo sentimos. Falta completar algunos campos obligatorios: '${missingFields.join(', ')}'. Por favor, revise dicha información.`})
        }

        // Validación del status (Por defecto en TRUE)
        if(typeof  product.status === 'undefined'){
            product.status = true;
        } else if (typeof product.status !== 'boolean'){
            return res.status(400).send({status: 'error', message: 'El campo "Status" debe ser un Boolean (True - False).'});
        }

        product.id = Math.floor(Math.random() * 10000);

        const products = await productsManager.getProducts();
        products.push(product);

        const isOK = await productsManager.saveProducts(products);
        if(!isOK){
            return res.status(500).send({status: 'error', message: 'Lo sentimos. El producto no pudo ser añadido por un problema interno.'});
        }
        return res.status(200).send({status: 'success', message: 'El producto fue añadido con éxito!', product});

    } catch (error) {
        console.log(error);
        return res.status(500).send({status: 'error', message: 'Lo sentimos. Ocurrio un error al procesar la solicitud de Alta.'})
    }
})

// Actualizar un Producto (Put)
productsRoutes.put('/:pid', async (req, res) => {
    const pId = +req.params.pid;
    const productToUpdate = req.body;

    const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category', 'thumbnail'];
    const missingFields = requiredFields.filter(field => !productToUpdate[field]);

    if (missingFields.length > 0) {
        return res.status(400).send({
            status: 'error',
            message: `Lo sentimos. Para actualizar el producto debes completar los siguientes campos: '${missingFields.join(', ')}'.`,
        });
    }

    // Validar el campo 'Status'
    if (typeof productToUpdate.status === 'undefined') {
        productToUpdate.status = true;
    } else if (typeof productToUpdate.status !== 'boolean') {
        return res.status(400).send({
            status: 'error',
            message: "El campo 'status' debe ser un boolean (true o false).",
        });
    }

    const products = await productsManager.getProducts();
    const productIndex = products.findIndex(p => p.id === pId);

    if (productIndex === -1) {
        return res.status(404).send({status: 'error', message: 'Lo sentimos. El Producto no pudo ser encontrado.'})
    }

    // Actualizar solo el producto seleccionado.
    products[productIndex] = {
        ...products[productIndex],
        ...productToUpdate,
        id: pId
    }

    // Guardar los productos actualizados
    const isOK = await productsManager.saveProducts(products);
    if(!isOK){
        return res.status(500).send({status: 'error', message: 'Lo sentimos. Hubo un error en el guardado del Producto.'});
    }
    res.send({status: 'ok', message: 'El Producto fue actualizado correctamente!'});
})

// Eliminar un Producto (Delete)
productsRoutes.delete('/:pid', async (req, res) => {
    const id = +req.params.pid;
    const product = await productsManager.getSingleProductsById(id);
    if (!product){
        return res.status(404).send({status:'error', message: 'Lo sentimos. El Producto no pudo ser encontrado.'});
    }
    const products = await productsManager.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    const isOk = await productsManager.saveProducts(filteredProducts);
    if(!isOk){
        return res.status(404).send({status: 'error', message: 'Hubo un error al Eliminar el Producto. Intentelo más tarde.'});
    }
    res.send({status: 'ok', message: 'El Producto fue Eliminado con éxito!'});
})

export default productsRoutes;