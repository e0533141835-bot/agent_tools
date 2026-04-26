import { Router } from 'express';
import { matchRoleController } from '../controllers/employee.controller';
import { handleManagerSummary } from '../controllers/summary.controller'; 

const router = Router();

// נתיב בדיקה שכן עובד בדפדפן (GET)
router.get('/test', (req, res) => {
  res.json({ success: true, message: "השרת עונה לנתיב הזה!" });
});

router.post('/match-role', matchRoleController);

router.post('/manager-summary', handleManagerSummary);

export default router;