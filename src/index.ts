process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRoutes from './routes/employee.routes';
import { connectToDatabase } from './db/connection';
import './config/firebase';

// טעינת הגדרות מקובץ .env
dotenv.config();

const app = express();
const { PORT = 3000, MONGO_URI, DB_NAME = 'practicom' } = process.env;

// --- Middlewares ---

// הפעלת CORS - חייב להופיע לפני הנתיבים (Routes)
app.use(cors()); 

// תמיכה בפורמט JSON בבקשות נכנסות
app.use(express.json());

// --- Routes ---

// ניתוב הבקשות לאזור ה-API של העובדים
app.use('/api/v1', employeeRoutes);

// טיפול בנתיבים לא קיימים (404)
app.use((req: Request, res: Response) => {
  console.log('⚠️ Attempted access to non-existent route:', req.originalUrl);
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

// --- Server Startup Logic ---

const start = async () => {
  try {
    // בדיקת תקינות הגדרות בסיסיות
    if (!MONGO_URI) {
      throw new Error('❌ Error: MONGO_URI is missing in environment variables');
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ Warning: Email credentials missing. The system will not send emails.');
    }

    // חיבור למסד הנתונים (MongoDB)
    await connectToDatabase(MONGO_URI, DB_NAME);
    console.log(`✅ Connected to Database: ${DB_NAME}`);

    // הרצת השרת (מאזין לכל הכתובות בפורמט שמתאים לענן)
    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`🚀 Server is active on port ${PORT}`);
      console.log(`📡 Base API URL: http://localhost:${PORT}/api/v1`);
    });

  } catch (err) {
    console.error('❌ Failed to start the server:', err);
    process.exit(1);
  }
};

start();