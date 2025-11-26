export class ApiError extends Error{
    constructor(message, res, statusCode){
        return res.status(statusCode).json({
            statusCode,
            message
        })
    }
}