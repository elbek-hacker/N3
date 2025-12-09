import { catchAsync } from "../middlewares/catch-async.js";
import User from "../schemas/user.schema.js";
import crypto from "../utils/crypto.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success_response.js";
import token from "../utils/token.js";

class AuthController{
    signIn = catchAsync( async ( req, res )=>{
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber });
        const isMatchPass = await crypto.encode(password, user?.hashedPassword || '');
        if ( !user || !isMatchPass ){
            throw new ApiError('Phone Number or password invalid', 400);
        }
        const payload = { id: user._id, role: user.role, isActive: user.isActive };
        const accessToken = token.getAccess(payload);
        const refreshToken = token.getRefresh(payload, res);
        return successRes( res, {
            user,
            accessToken, 
            refreshToken
        });
    })
}

export default new AuthController();