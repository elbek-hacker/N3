import { ApiError } from "./custom-error.js"

export default (err, _req, res, _next) => {
    if (!err instanceof ApiError || !err.statusCode){
        console.log('Danggg', err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal server error'
        })
    };
    return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message
    });
};