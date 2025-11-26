import { Router } from "express";
import controller from "../controllers/category.controller.js";

const router = Router()

router
    .post('/', controller.create)
    .get('/', controller.findAll)
    .get('/:id', controller.findONe)
    .patch('/:id', controller.update)
    .delete('/:id', controller.remove)

export default router