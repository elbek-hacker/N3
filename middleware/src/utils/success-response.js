export const successRes = (res, data, statusCode = 200) => {
    return res.status(201).json({
        statusCode, 
        message: 'success', 
        data
    });
};