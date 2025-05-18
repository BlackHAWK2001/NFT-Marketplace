import User from '../models/UserSchema/User.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Wallet from '../models/FinancialSchema/Wallet.models.js';
import client from '../config/redis.js';


async function register(req,res) {
    try {
        const {username,email,password} = req.body;

        if(!username || !email || !password) {
            return res.json({success:false,message:'All fields are required!'})
        }

        const exists = await User.findOne({email});
        if(exists) {
            return res.json({success:false,message:'Email already exists!'});
        }

        if(password.length < 5) {
            return res.json({success:false,message:'Please enter a strong password!'});
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const profileImage = 'https://avatar.iran.liara.run/public/boy?username=Ivan';

        const user = new User({
            username,
            email,
            password:hashedPassword,
            profileImage:profileImage
        });

        await user.save();
        
        const newWallet = new Wallet({
            user: user._id,  
        });

        await newWallet.save();

        res.status(201).json({
            message: 'User and wallet created successfully!',
            user,
            wallet: newWallet,
        });

    } catch (err) {
        res.status(500).json({message:"Error in register controller",error:err});
    }
}


async function login(req,res) {
    try {
        const {email,password} = req.body;
        
        const user = await User.findOne({email});
        if(!user) {
            return res.json({ success: false, message: "User doesn't exists" });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch) {
            const token = jwt.sign({id:user._id},process.env.SECRET,{expiresIn:'7d'});
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (err) {
        res.status(500).json({message:"Error in login controller",error:err});
    }
}


async function logout(req,res) {
    try {
        return res.status(200).json({ message: 'Logout is successful!' });
    } catch (err) {
        res.status(500).json({ message: 'Error in logout controller', error: err });
    }
}


async function getProfile(req,res) {
    try {
        const userId = req.user.id;
        const cachedUser = await client.get(`profile:${userId}`);
        if(cachedUser) {
            return res.status(200).json({data:JSON.parse(cachedUser)});
        }
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User is not found' });
        }

        await client.set(`profile:${userId}`,JSON.stringify(user),{EX:600});
        res.status(200).json(user);
        // res.status(200).json({ data: user });
    } catch (err) {
        res.status(500).json({ message: 'Error in getProfile controller', error: err });
    }
}


async function updateProfile(req,res) {
    try {
        const {username,email,password} = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {username,email,password},
            {new:true}
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error in updateProfile controller', error: err });
    }
}

async function getUserMessages(req, res) {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('nftLikes walletTransfers auctionBids');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user messages', error: err });
    }
}

export {register,login,logout,getProfile,updateProfile,getUserMessages};