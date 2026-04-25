process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employee.routes';
import { connectToDatabase } from './db/connection';

dotenv.config();

const app = express();
const { PORT = 3000, MONGO_URI, DB_NAME = 'practicom' } = process.env;

app.use(express.json());

app.use('/api/v1', employeeRoutes);

app.use((req: Request, res: Response) => {
  console.log('⚠️ Someone tried to hit a wrong route:', req.originalUrl);
  res.status(404).json({ success: false, message: 'Route not found' });
});


const start = async () => {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI is missing in .env');
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Warning: Email credentials missing. Loop Closer will not send emails.');
    }

    await connectToDatabase(MONGO_URI, DB_NAME);
    
    // app.listen(PORT, () => {
    //   console.log(`🚀 Server is running on http://localhost:${PORT}`);
    //   console.log(`📡 API available at http://localhost:${PORT}/api/v1`);
    // });
    app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    });
     
  } catch (err) {
    console.error('❌ Startup error:', err);
    process.exit(1);
  }
};

start();