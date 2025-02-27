import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../model/userModel.js';
import APIError from '../types/Error.js';
import passport from 'passport';

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
            name: newUser.name,
            email: newUser.email,
            accessToken,
            refreshToken
        }
    });
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new APIError('Please provide email and password', 400);
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
        throw new APIError('User not found', 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new APIError('Incorrect password', 401);
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: {
            name: user.name,
            email: user.email,
            accessToken,
            refreshToken,
        }
    });
}

const initiateLogin_Oauth = (req, res, next) => {
    const { provider } = req.params;

    if (["google"].includes(provider)) {
        passport.authenticate(provider)(req, res, next);
    } else {
        throw new APIError("Invalid provider", 400);
    }
};

const handleCallback_Oauth = (req, res, next) => {
    const { provider } = req.params;

    if (["google"].includes(provider)) {
        passport.authenticate(provider, { session: false })(req, res, next);
    } else {
        throw new APIError("Invalid provider", 400);
    }
};

const finalizeLogin_Oauth = async (req, res) => {
    const userId = req.user._id;
    const accessTokenKey = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenKey = process.env.REFRESH_TOKEN_SECRET;

    if (!accessTokenKey || !refreshTokenKey) {
        throw new APIError("Internal Server Error , Missing token Secret", 500);
    }


    const refreshToken = await jwt.sign(
        { id: userId },
        refreshTokenKey,
        { expiresIn: "7d" }
    );


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    });

    res.redirect(`http://localhost:5173/dashboard`);
};

export {
    register,
    login,
    initiateLogin_Oauth,
    handleCallback_Oauth,
    finalizeLogin_Oauth,
};