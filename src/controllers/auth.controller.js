import { catchAsync } from "../middlewares/catch-async.js";
import User from "../schemas/user.schema.js";
import crypto from "../utils/crypto.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success_response.js";
import token from "../utils/token.js";
import { sendMail } from "../utils/mail-service.js";
import { generateOTP } from "../utils/generate-otp.js";
import { getCache, setCache } from "../helpers/catch-control.js";

class AuthController{
    signIn = catchAsync( async ( req, res )=>{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatchPass = await crypto.encode(password, user?.hashedPassword || '');
        if ( !user || !isMatchPass ){
            throw new ApiError('Phone Number or password invalid', 400);
        }
        const otp = generateOTP();
        setCache(email, otp);
        await sendMail(email, otp);
        return successRes(res, {
            otp
        });
    })

    confirmOTP = catchAsync(async ( req, res )=>{
        const { email, otp } = req.body;
        const user = await User.findOne({email});
        if ( !user ){
            throw new ApiError('Email is wrong', 404);
        }
        const cacheData = getCache(email);
        if ( !cacheData || cacheData != otp ){
            throw new ApiError('OTP expired or incorrect', 400);
        }
        const payload = { id: user._id, role: user.role, isActive: user.isActive };
        const accessToken = token.getAccess(payload);
        const refreshToken = token.getRefresh (payload, res);
        return successRes(res, {
            accessToken,
            refreshToken,
            user
        });
    })

    getAccessToken = catchAsync(async (req, res)=>{
        const refreshToken = req.cookies?.refreshToken;
        if( !refreshToken ){
            throw new ApiError("please sign in first", 401);
        }
        const data = token.verifyRefresh(refreshToken);
        if(!data) {
            throw new ApiError('something went wrong. please sign in again!', 401);
        }
        const user = await User.findById(data?.id);
        if(!user){
            throw new ApiError('your data is not found', 400);
        }
        const payload = { id: user._id, role: user.role, isActive: user.isActive };
        const accessToken = token.getAccess(payload);
        return successRes(res, {
            token: accessToken
        });
    })

    signOut = catchAsync (async ( req, res )=>{
        const refreshToken = req.cookies?.refreshToken;
        if ( refreshToken){
            res.clearCookie('refreshToken');
        }
        return successRes(res, {});
    })
}

export default new AuthController();