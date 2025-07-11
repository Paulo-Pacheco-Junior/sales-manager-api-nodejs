import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { app } from "./app"
import cors from 'cors';
import 'express-async-errors';

dotenv.config();

const PORT = process.env.PORT || 3333;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Sales Manager API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 