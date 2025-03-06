const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            message: "Signup successfully",
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server errror",
            success: false
        })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: 'User Not found', success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: "Password is wrong", success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email,
            name: user.name
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server errror",
            success: false
        })
    }
}

const resetpassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User Not found', success: false });
        }
        const jwtToken = req.header('Authorization').replace('Bearer ', '');
        if (!jwtToken) {
            return res.status(403).json({ message: "You are not authorized to reset password", success: false });
        }

        try {
            const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
            if (payload.email !== user.email) {
                return res.status(403).json({ message: "Invalid token", success: false });
            }
        } catch (error) {
            return res.status(403).json({ message: "Invalid or expired token", success: false });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({
            message: "Password reset successfully",
            success: true,
            jwtToken,
            email,
        })
        
    } catch (err) {
        res.status(500).json({
                message: "Internal server errror",
                success: false
            })
    }
}


module.exports = {
    signup,
    login,
    resetpassword
}