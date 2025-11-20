import { isValidObjectId } from 'mongoose';
import Player from '../schema/players.schema.js';
import asyncHandler from '../utils/async-handler.js';
import { ApiError } from '../utils/custom-error.js';
import { successRes } from '../utils/success-response.js';
class PlayerController {
    create = asyncHandler(async (req, res)=>{
        const { name } = req.body;
        const existsPlayer = await Player.findOne({ name });
        if(existsPlayer){
            throw new ApiError(409, 'The player already exists');
        };
        const newPlayer = await Player.create(req.body);
        return successRes(res, newPlayer, 201);
    });
    update = asyncHandler(async (req, res)=>{
        const  { id } = req.params;

        if (!isValidObjectId( id )){
            throw new ApiError(404, 'Invalid ID you entered!')
        };
        const existsPlayer = await Player.findById( id );
        if( existsPlayer ) {
            const updatedPlayer = await Player.findByIdAndUpdate(
                id,
                req.body,
                { 
                    new: true,
                    runValidators: true
                }
            );
            return successRes(res, updatedPlayer);
        };
        throw new ApiError(404, 'The player not found!');
    });
    getAll = asyncHandler(async (_req, res)=>{
        const allPlayers = await Player.find();
        return successRes(res, allPlayers);
    });
    getById = asyncHandler(async (req, res)=>{
        const { id } = req.params;
        if(!isValidObjectId( id )){
            throw new ApiError(500, "Invalid ID you entered!")
        };
        const player = await Player.findById( id );
        if( !player ){
            throw new ApiError(404, "Player not found!")
        };
        return successRes(res, player);
    });
    remove = asyncHandler( async (req, res)=>{
        const { id } = req.params;
        if( !isValidObjectId( id )){
            throw new ApiError(500, "Invalid ID you entered!");
        };
        if( await Player.findByIdAndDelete( id )){
            return successRes(res, {}, 200);
        };
        throw new ApiError(404, "Player not found!");
    })
}

export default new PlayerController();