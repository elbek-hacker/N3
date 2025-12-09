import { Roles } from "../enums/index.js";
import { catchAsync } from "../middlewares/catch-async.js";
import crypto from "../utils/crypto.js";
import { successRes } from "../utils/success_response.js";
import { BaseController } from "./base.controller.js";
import Admin from '../schemas/user.schema.js'
import { ApiError } from "../utils/custom-error.js";


class AdminController extends BaseController {
    create = catchAsync( async (req, res)=> {
        const { phoneNumber, email, username, password } = req.body;
        await this._isExist({ phoneNumber }, "Phone number");
        if(email){
            await this._isExist({ email }, "Email address");
        }
        if( username ){
            await this._isExist({username}, "Username");
        }
        const hashedPassword = await crypto.decode(password);
        delete req.body?.pasword;
        const newAdmin = await Admin.create({
            hashedPassword,
            role: Roles.ADMIN,
            ...req.body
        });
        return successRes(res, newAdmin, 201);
    })

    update = catchAsync(async (req, res)=>{
        const id = req.params?.id;
        const admin = await this._getById(id);
        const { phoneNumber, email, username, password } = req.body;
        if ( phoneNumber ){
            const existsPhone = await Admin.findOne( { phoneNumber } );
            if ( existsPhone && existsPhone.id != id ){
                throw new ApiError('Phone number already exists', 409);
            }
        }
        if( email ){
            const existsEmail = await Admin.findOne({email});
            if ( existsEmail && existsEmail.id != id ){
                throw new ApiError('Email address already exists', 409);
            }
        }
        if ( username ){
            const existsUsername = await Admin.findOne({ username });
            if ( existsUsername && existsUsername.id != id ){
                throw new ApiError("Username already exists", 409);
            }
        }
        let hashedPassword = admin.hashedPassword;
        if ( password ){
            hashedPassword = await crypto.decode(password);
            delete req.body?.password;
        }
        const newAdmin = await Admin.create( {
            hashedPassword,
            ...req.body
        });
        return successRes(res, newAdmin);
    })
}

export default new AdminController( Admin );