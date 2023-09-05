
import express from 'express';
import cors from 'cors';
import { run } from './connection.js';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.get('/',(req,res)=>{
  res.send('Welcome To Codingbit Project API');
})

const PORT=process.env.PORT || 5000;
await run();
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))