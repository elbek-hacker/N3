import { Router } from 'express'
import controller from '../controllers/country.controller.js'
const countryRouter = Router();

countryRouter
        .get('/', controller.findAll)
        .get('/:id', controller.findOne)
        .post('/', create)
        .put('/:id', update)
        .delete('/:id', remove)

export { countryRouter };