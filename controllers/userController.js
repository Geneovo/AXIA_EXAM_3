const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({message: 'Missing Details'});
        }

        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({name, email, password: hashedPassword});
        await user.save();

        res.status(201).json({message: 'User created successfully'});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }

        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid email'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).json({message: 'Invalid password'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.status(200).json({token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});    
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        return res.status(200).json({users});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, password} = req.body;
        const user = await userModel.findByIdAndUpdate(
            id, {name, email, password}, {new: true}).select('-password');
        
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json({user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await userModel.findByIdAndDelete(id);
        return res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}