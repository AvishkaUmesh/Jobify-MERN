import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import 'express-async-errors';

import connectDB from './db/connect.js';

// Routers
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = express();

dotenv.config();

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

app.get('/', (req, res) => {
	res.send('Welcome!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(port, () => console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
