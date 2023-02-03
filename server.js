import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import 'express-async-errors';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import connectDB from './db/connect.js';

// Routers
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

const app = express();

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

// only when ready to deploy
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

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
