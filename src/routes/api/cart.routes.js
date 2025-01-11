import { Router } from "express";

const cartRoutes = Router();

cartRoutes.get('/', (req, res) => {
    res.send('Hola, esto es CartProduct')
})

export default cartRoutes;