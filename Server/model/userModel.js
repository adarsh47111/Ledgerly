import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            return this.authProvider === "local";
        },
    },
    authProvider: {
        type: String,
        enum: ["local", "google", "github"],
        default: "local",
    },
})

const UserModel = new mongoose.model('User', schema)

export default UserModel;