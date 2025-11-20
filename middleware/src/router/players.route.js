import controller from '../controller/players.controller.js';
import { Router } from "express";

const router = Router();

router
    .post('/', controller.create)
    .put('/:id', controller.update)
    .get('/', controller.getAll)
    .get('/:id', controller.getById)
    .delete('/:id', controller.remove)


export default router;