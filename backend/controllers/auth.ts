// controllers/auth.ts
import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {

  try {
    const { username, password } = req.body;
    // Validate input and create a new user
    const existingUser = await User.findOne({ username });
    if(existingUser){
        return res.status(400).json({ error: 'User already exists' });
    }
    const user = new User({ username, password });
    await user.save();
    console.log("Registered Successfully", user);
    res.status(201).json({ message: 'User registered successfully', username, password });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // Verify user credentials and generate a JWT
    const user = await User.findOne({ username }).select('+password');;
    console.log(user);
    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
        console.log(process.env.JWT_SECRET);
      const token = jwt.sign({ userId: user._id }, "defaulSecret");
      res.status(200).json({ token });
    }
  } catch (error) {
    
    console.log("Error encountered",error);
    res.status(500).json({ error: 'Login failed' });
  }
};
