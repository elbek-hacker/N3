import { isValidObjectId } from 'mongoose';
import  User  from '../schema/users.schema.js';

class UserController {
    async create(req, res){
        const { email } = req.body;
        const existUser = await User.findOne({ email});
        if(existUser){
            console.log('this user already exists');
            return res.status(409).json({
                message: 'This user already exists'
            });
        };
        const newUser = await User.create(req.body);
        return res.status(201).json({
            status: 201,
            data: newUser
        });
    }
    async getAll(_req, res){
        const allUser = await User.find();
        return res.status(200).json({
            status: 200,
            data: allUser
        })
    }
    async getOne(req, res){
        const id = req.params.id;
        console.log(id);
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                status: 400,
                message: 'You entered an invalid ID'
            });
        }        
        const user = await User.findById(id);
        if(user){
            return res.status(200).json({
                status: 200,
                data: user
            });
        };
        return res.status(404).json({
            status: 404,
            message: 'User not found!'
        });
    }
    async remove(req, res){
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                status: 400,
                message: 'You entered an invalid ID'
            });
        }        
        const user = await User.findOne({ id });
        if(user){
            User.findByIdAndDelete({ id });
            return res.status(200).json({
                status: 200,
                data: {}
            })
        };
        return res.status(404).json({
            status: 404,
            message: 'User not found!'
        });
    }
}

export default new UserController();