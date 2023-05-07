import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from "./authModel";
import 'dotenv/config';
const router=express.Router();



router.post("/register",async(req,res)=>{
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
});

router.post("/login",async(req,res)=>{
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
        const JWT_SECRET_KEY:any=process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ id: user[0].dataValues.id}, JWT_SECRET_KEY,{expiresIn:"1h"});
        //set the token in the header
        res.set('Authorization', `Bearer ${token}`);

        return res.status(200).json({success:true,
                token
            });

    } catch (err) {
        return res.status(404).json({ success: false, message: 'Invalid credentials' });
    }

});

router.post('/logout', (req, res) => {
    res.setHeader('Set-Cookie', 'token=; Max-Age=-1')
    

    res.status(200).send("logged out successfully");
    })
  

export default router;
