import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number },
    image: { type: String },
    category: { ref: 'Category', type: mongoose.Schema.Types.ObjectId, required: true}
}, {
    versionKey: false,
    timestamps: true
});

export default mongoose.model("Product", productSchema);