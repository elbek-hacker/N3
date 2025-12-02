import { ApiError } from "../utils/custom-error.js";
import { errorRes } from "../utils/error-response.js";

export function validator(schema) {
    return function (req, res, next) {
        try {
            const { error } = schema(req.body);
            if (error) {
                throw new ApiError(error.details[0]?.message, 422);
            }
            return next();
        } catch (error) {
            return errorRes(res, error);
        }
    }
}