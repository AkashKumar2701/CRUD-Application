import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

const SECRET_KEY =process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    // if token is present in header or not (token is always at the first index)
    const token = req.headers.authorization?.split(" ")[1];
    
    // if token length is less than 500 then it is custom user otherwise the user is logged in using Google Login
    const isCustomAuth = token.length < 500;

    let decodedData;

    // if there is user logged in and is valid to perform an action 
    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, SECRET_KEY);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    // callling next after performing required steps
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
