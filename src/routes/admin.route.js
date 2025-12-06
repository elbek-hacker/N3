import { Router } from "express";

import controller from '../controllers/admin.controller.js';

const router = Router();

router
    .post('/', controller.create)


export default router;