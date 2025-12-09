import Joi from "joi";
import { Genders } from "../enums/index.js";

class UserValidator {
    _phoneRegex = /^\+[1-9]\d{1,14}$/;
    _passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    create( data ) {
        const user = Joi.object({
            fullname: Joi.string().optional(),
            phoneNumber: Joi.string().regex(this._phoneRegex).required(),
            email: Joi.string().email().optional(),
            username: Joi.string().min(4).optional(),
            password: Joi.string().regex(this._passwordRegex).required(),
            address: Joi.string().optional(),
            image: Joi.string().optional(),
            gender: Joi.string().valid(Genders.MALE, Genders.FEMALE).optional()
        });
        return user.validate(data);
    }


    update(data){
        const user = Joi.object({
            fullName: Joi.string().optional(),
            phoneNumber: Joi.string().regex(this._phoneRegex).optional(),
            email: Joi.string().email().optional(),
            username: Joi.string().min(4).optional(),
            password: Joi.string().regex(this._passwordRegex).optional(),
            address: Joi.string().optional(),
            image: Joi.string().optional(),
            gender: Joi.string().valid(Genders.MALE, Genders.FEMALE).optional(),
            isActive: Joi.bool().optional()
        });
        return user.validate(data);
    }

    signin(data){
        const user = Joi.object({
            phoneNumber: Joi.string().required(),
            password: Joi.string().required()
        });
        return user.validate(data);
    }
}

export default new UserValidator();