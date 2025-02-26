import express from 'express'
import cors from 'cors'
import authRouter from './router/authRouter.js'
import connectDB from './middleware/db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
connectDB()