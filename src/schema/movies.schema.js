import { model, Schema } from "mongoose";

const moviesSchema = new Schema({
    title: {type: String, unique: true, required: true},
    description: { type: String},
    language: { type: String},
    genre: { type: String }
}, {
    versionKey: false,
    timestamps: true
})
export default model("Movie", moviesSchema);