import express from 'express'
import cors from 'cors'
import authRouter from './router/authRouter.js'
import customerRouter from './router/customerRouter.js'
import connectDB from './middleware/db.js';
import oAuth from './middleware/oAuth.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import authenticate from './middleware/authenticate.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(oAuth);

app.use("/auth", authRouter)
app.use("/customer", authenticate, customerRouter)

app.use(globalErrorHandler)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
connectDB()