// to access SECRET_KEY from .env
import dotenv from 'dotenv';
dotenv.config(); 

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const SECRET_KEY = process.env.SECRET_KEY;

// function to sign in the user and return response to frontend
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    // if user does not exists
    if (!oldUser) return res.status(200).json({ message: "User Doesn't Exist" });

    // if password is incorret
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(200).json({ message: "Invalid credentials" });

    // otherwise generate a token and return response to frontend
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Something went wrong" });
  }
};

// function to sign up the user and return response to frontend
export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    // if email is already taken
    if (oldUser) {
      return res.status(200).json({ message: "Email Already Taken" });
    }

    // if both password do not match
    if (password !== confirmPassword) {
      return res.status(200).json({ message: 'Passwords Not Matched' })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // save the user in database
    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
    
  // generate token and return to frontend
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
