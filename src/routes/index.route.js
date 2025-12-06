import { Router } from "express";

import adminRouter from './admin.route.js'
import categoryRouter from './category.route.js'
import productRouter from './product.route.js'

const router = Router();

router
    .use('/admin', adminRouter)
    .use('/category', categoryRouter)
    .use('/product', productRouter)

export default router;