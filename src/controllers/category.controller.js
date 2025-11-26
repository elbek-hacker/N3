import Category from "../schemas/category.schema.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from '../utils/success_response.js';
import { errorRes } from "../utils/error-response.js";

class CategoryController{
    async create(req, res){
        try {
            const { name } = req.body;
            const existsCategory = await Category.findOne({ name });
            if(existsCategory){
                throw new ApiError('Category name already exists', 409);
            }
            const newCategory = await Category.create(req.body);
            return successRes(res, newCategory, 201);
        } catch (error) {
            return errorRes(res, error);
        }
    }
    async findAll(_req, res){
        try {
            const catetories = await Category.find();
            return successRes(res, catetories);
        } catch (error) {
            return errorRes(res, error);
        }
    }
    async findONe(req, res){
        try {
            const category = await Category.findById(req.params?.id);
            if(!category){
                throw new ApiError( 'Category not found!', 404);
            }
            return successRes(res, category);
        } catch (error) {
            return errorRes(res, error);
        }
    }
    async update(req, res){
        try {
            const category = await Category.findById(req.params?.id);
            if(!category){
                throw new ApiError( 'Category not found!', 404);
            }
            const updateCategory = await Category.findByIdAndUpdate(req.params?.id, req.body, {
                new: true
            });
            return successRes(res, updateCategory);
        } catch (error) {
            return errorRes(res, error);
        }
    }
    async remove (req, res){
        try {
            const category = await Category.findById(req.params?.id);
            if(!category){
                throw new ApiError( 'Category not found!', 404);
            }
            await Category.findByIdAndDelete(req.params?.id);
            return successRes(res, {});
        } catch (error) {
            return errorRes(res, error);
        }
    }
}

export default new CategoryController();