import { model, Schema } from "mongoose";

const playersSchema = new Schema({
    name: { type: String, required: true, unique: true},
    age: { type: Number, required: true},
    from: { type: String}
}, {
    versionKey: false,
    timestamps: true
});
export default model('Player', playersSchema);