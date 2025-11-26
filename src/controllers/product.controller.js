import Product from "../schemas/product.schema.js";
import { ApiError } from "../utils/custom-error.js";
import { errorRes } from "../utils/error-response.js";
import { successRes } from "../utils/success_response.js";

class ProductController{
    async create(req, res){
        try {
            const { name } = req.body;
            const existProduct = await Product.findOne({ name });
            if(existProduct){
                throw new ApiError("This product already exists!", 409);
            };
            const newProduct = await Product.create(req.body);
            return successRes(res, newProduct, 200);
        } catch (error) {
            return errorRes(res, error);
        }
    }
    async findAll(req, res){
        try {
            const products = await Product.find();
            return successRes(res, products)
        } catch (error) {
            return errorRes(res, error);
        }
    }
    async findOne(req, res){
        try {
            const product = await Product.findById(req.params?.id);
            if(!product){
                throw new ApiError('Product not found', 404);
            };
            return successRes(res, product);
        } catch (error) {
            return errorRes(res, error);
        }
    }
    async update(req, res){
        try {
            const product = await Product.findById(req.params?.id);
            if(!product){
                throw new ApiError("Product not found!", 404);
            };
            const updateProduct = await Product.findByIdAndUpdate(req.params?.id, req.body, {new: true});
            successRes(res, updateProduct)
        } catch (error) {
            return errorRes(res, error);
        }
    }
    async remove(req, res){
        try {
            const product = await Product.findById(req.params?.id);
            if(!product){
                throw new ApiError("Product not found!", 404);
            };
            await Product.findByIdAndDelete(req.params?.id);
            return successRes(res, {})
        } catch (error) {
            return errorRes(res, error);
        }
    }
}

export default new ProductController();