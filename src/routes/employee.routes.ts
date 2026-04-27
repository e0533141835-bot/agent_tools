import { Router } from 'express';
import { matchRoleController } from '../controllers/employee.controller';
import { handleManagerSummary } from '../controllers/summary.controller'; 
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// נתיב בדיקה שכן עובד בדפדפן (GET)
router.get('/test', (req, res) => {
  res.json({ success: true, message: "השרת עונה לנתיב הזה!" });
});

router.post('/match-role',verifyToken, matchRoleController);

router.post('/manager-summary', verifyToken, handleManagerSummary);

export default router;