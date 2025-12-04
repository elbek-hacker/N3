import { Router } from "express";

import categoryRouter from './category.route.js'
import productRouter from './product.route.js'
const router = Router();

router
    .use('/category', categoryRouter)
    .use('/product', productRouter)

export default router;