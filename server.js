const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use('/api', userRouter);
app.use('/api', postRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
}) 