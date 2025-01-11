import { Router } from "express";

const productsRoutes = Router();

productsRoutes.get('/', (req, res) => {
    res.send('Hola, esto es productsRoutes')
})

export default productsRoutes;