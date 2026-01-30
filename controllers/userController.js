const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            res.status(400).json({message: 'Missing Details'});
        }

        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.status(201).json({token});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json({users});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json({user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}
