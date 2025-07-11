import 'dotenv/config';
import { Request, Response } from 'express';
import { app } from "./app"
import { env } from "./env"

const PORT = env.PORT

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Sales Manager API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 