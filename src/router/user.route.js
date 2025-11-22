import controller from '../controller/users.controller.js';

import { Router } from 'express';

const router = Router();

router
    .post('/', controller.create)
    .get('/', controller.getAll)
    .get('/:id', controller.getOne)
    .delete('/:id', controller.remove)


export default router;