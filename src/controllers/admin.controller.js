import { Roles } from "../enums/index.js";
import { catchAsync } from "../middlewares/catch-async.js";
import crypto from "../utils/crypto.js";
import { successRes } from "../utils/success_response.js";
import { BaseController } from "./base.controller.js";
import Admin from '../schemas/user.schema.js'

class AdminController extends BaseController{
    create = catchAsync( async (req, res) => {
        const { phoneNumber, email, username, password } = req.body;
        await this._isExist({ phoneNumber }, 'Phone number');
        if( email ){
            await this._isExist( { email }, 'Email address');
        }
        if( username ){
            await this._isExist({ username }, 'Username');
        }
        const hashedPassword = await crypto.decode(password);
        delete req.body?.password;
        const newAdmin = await Admin.create({
            hashedPassword,
            role: Roles.ADMIN,
            ...req.body
        });
        return successRes(res, newAdmin, 201);
    })
}

export default new AdminController(Admin);