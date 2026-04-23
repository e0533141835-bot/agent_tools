import { Router } from 'express';
import { matchRoleController } from '../controllers/employee.controller';
import { handleManagerSummary } from '../controllers/summary.controller'; 

const router = Router();

router.post('/match-role', matchRoleController);

router.post('/manager-summary', handleManagerSummary);

export default router;