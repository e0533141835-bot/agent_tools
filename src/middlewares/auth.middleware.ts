import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // 1. אנחנו מחפשים את הטוקן בתוך הכותרות (Headers) של הבקשה
  const authHeader = req.headers.authorization;

  // 2. אם אין טוקן בכלל, או שהוא לא מתחיל במילה "Bearer" (התקן המקובל), נעיף את הבקשה
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided. Unauthorized.' });
  }

  // 3. חותכים את המילה "Bearer " ונשארים רק עם המחרוזת של הטוקן עצמו
  const token = authHeader.split('Bearer ')[1];

  try {
    // 4. הקסם! אנחנו נותנים לפיירבייס לבדוק אם הטוקן הזה אמיתי ובתוקף
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // אם הגענו לכאן, הטוקן אמיתי! אנחנו שומרים את פרטי המשתמש לבקשה (למקרה שנצטרך)
    (req as any).user = decodedToken;
    
    // 5. הכל תקין, מעבירים את הבקשה הלאה לפונקציה שלך (הקונטרולר)
    next(); 
  } catch (error) {
    console.error('[AuthMiddleware] Error verifying token:', error);
    return res.status(401).json({ success: false, message: 'Invalid token. Unauthorized.' });
  }
};