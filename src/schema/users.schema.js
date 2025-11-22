import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String, minlength:[6, "password must be at least 6 digits"]}
}, {
    versionKey: false,
    timestamps: true
});

export default model('User', userSchema);