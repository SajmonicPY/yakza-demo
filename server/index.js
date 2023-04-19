import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import { connect } from 'mongoose';
import postRoutes from './routes/postRoutes.js';
import yakzaRoutes from './routes/yakzaRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/yakza', yakzaRoutes);


app.get('/', async (req,res) => {
    res.send('Hello from Yakza!');
})

const startServer = async () => {

    try {
        connect(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    }   catch (error) {
        console.log(error);
    }
}

startServer();