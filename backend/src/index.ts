import express from 'express';
import cors from 'cors';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import charactersRouter from './routes/characters.js';
import contributionsRouter from './routes/contributions.js';
import uploadRouter from './routes/upload.js';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(process.cwd(), 'public', 'images'));

app.use((req, res, next) => {
  (req as any).prisma = prisma;
  next();
});

app.use('/api/characters', charactersRouter);
app.use('/api/contributions', contributionsRouter);
app.use('/api/upload', uploadRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
