import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, unique: true, required: true},
    description: { type: String},
    image: { type: String}
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
})
categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
});

export default model('Category', categorySchema);