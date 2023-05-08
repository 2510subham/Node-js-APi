import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from "../model/authModel";
import { JWT_SECRET_KEY } from "../src/config";



export const registerUser=async(req:any,res:any)=>{
    console.log(req.body);
    
    try {
        //hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.status(200).json({ success: true, message: "successfully registered"});
    } catch (err) {
        res.status(404).json({ success: false, message: "failed to register",error:err});
    }
};

export const loginUser=async(req:any,res:any)=>{
    const email = req.body.email;

    try {
        const user:any = await User.findAll({where:{ email:email }});        

        //if user does not exist
        if (!user) {
            return res.status(404).send({ success: false, message: "user does not exist" });
        }
        //if user exists then compare the password

        const validPassword = await bcrypt.compare(req.body.password, user[0].dataValues.password);
        //if not correct
        if (!validPassword) {
            return res.status(404).send({ success: false, message: "wrong password" });
        }
        //if correct
        //create jwt token
        const token = jwt.sign({ id: user[0].dataValues.id}, JWT_SECRET_KEY,{expiresIn:"1h"});
        //set the token in the header
        res.set('Authorization', `Bearer ${token}`);

        return res.status(200).json({success:true,
                token
            });

    } catch (err) {
        return res.status(404).json({ success: false, message: 'Invalid credentials' });
    }

};

export const logoutUser=async (req:any, res:any) => {
    res.setHeader('Set-Cookie', 'token=; Max-Age=-1')
    

    res.status(200).send("logged out successfully");
    }
  

