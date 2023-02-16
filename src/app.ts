import express from 'express';
import db from 'mongoose';
import productRoutes from './routes/crud';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

// Create an instance of Express.js
const app = express();

// Set up middleware
app.use(express.json());
app.use(cors());

app.use(json());
const port = process.env.PORT || 3030;

app.use(urlencoded({ extended: true }));

app.use('/', productRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({ message: err.message });
});

db.connect('mongodb://127.0.0.1:27017/products', () => {
    console.log('Database connected');
});

app.listen(port, () => console.log(`server is running on http://localhost:${port}`));
