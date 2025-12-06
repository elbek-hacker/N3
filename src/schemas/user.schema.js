import { model, Schema } from "mongoose";
import { Genders, Roles } from "../enums/index.js";

const userSchema = new Schema ({
    fullname: { type: String },
    phoneNumber: { type: String, required: true, unique: true},
    email: { type: String, unique: true},
    username: { type: String, unique: true },
    hashedPassword: { type: String, required: true },
    address: { type: String},
    image: { type: String},
    gender: { type: String, enum: [Genders.MALE, Genders.FEMALE] },
    role: {
        type: String, enum: [
            Roles.SUPERADMIN,
            Roles.ADMIN,
            Roles.SELLER,
            Roles.CUSTOMER
        ], required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export default model('User', userSchema);