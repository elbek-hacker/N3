import Movie from '../schema/movies.schema.js';
import { ApiError } from '../utils/custom-error.js';
import { errorRes } from '../utils/error-response.js';
import { successRes } from '../utils/succesRes.js';
class controllerMovie{
    async create(req, res){
        try {
            const { title } = req.body;
            const existsMovie = await Movie.findOne({title});
            if ( existsMovie ){
                return new ApiError('This is already exists', res, 409);
            };
            const newMovie = await Movie.create(req.body);
            return successRes(res, newMovie, 200);
        } catch (error) {
            return errorRes(res, error);
        }
    }
    async getAll(_req, res){
        try {
            const movies = await Movie.find();
            return successRes(res, movies);
        } catch (error) {
            return errorRes(res, error)
        }
    }
    async getOne(req, res){
        try {
            const id = String(req.params.id);
            const movie = await Movie.findById(id);
            if(!movie){
                return new ApiError("This movie doesn't exist!", res, 404)
            }
            return successRes(res, movie)
        } catch (error) {
            return errorRes(res, error)
        }
    }
    async update(req, res){
        try {
            const id = String(req.params.id);
            const movie = await Movie.findById(id);
            if(!movie){
                return new ApiError("This movie doesn't exist!", res, 404)
            };
            const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {new: true});
            return successRes(res, updatedMovie, 201);
        } catch (error) {
            return errorRes(res, error)
        }
    }
    async delete(req, res){
        try {
            const id = String(req.params.id);
            const movie = await Movie.findById(id);
            if(!movie){
                return new ApiError("This movie doesn't exist!", res, 404)
            };
            await Movie.findByIdAndDelete(id);
            return successRes(res)
        } catch (error) {
            return errorRes(res, error)
        }
    }
}
export default new controllerMovie();
