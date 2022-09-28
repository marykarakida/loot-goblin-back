import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';

const app = express();

app.use(cors());
app.use(json());

export default app;
