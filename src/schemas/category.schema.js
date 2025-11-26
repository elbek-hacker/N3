import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, unique: true, required: true},
    description: { type: String},
    image: { type: String}
}, {
    versionKey: false,
    timestamps: true
})

export default model('Category', categorySchema);