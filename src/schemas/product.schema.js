import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, unique: true},
    description: { type: String},
    price: { type: Number}
}, {
    versionKey: false,
    timestamps: true
});

export default model("Product", productSchema);