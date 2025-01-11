import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
    res.render('home', {products: []})
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realtimeproducts')
})

export default router