import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Sharif!');
});

export default app;
