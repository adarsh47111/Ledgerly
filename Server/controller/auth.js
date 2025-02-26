import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../model/userModel.js';
import APIError from '../types/Error.js';

const register = async (req, res, next) => {

    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
        throw new APIError('Please provide all required fields', 400);
    }

    const user = await UserModel.findOne({ email: email })

    if (user) {
        throw new APIError('User already exists', 400);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword
    });

    const accessToken = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
            accessToken,
            refreshToken
        }
    });
}

export { register };