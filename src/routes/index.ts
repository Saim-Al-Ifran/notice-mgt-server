import { Router } from 'express';
import noticeRoutes from './notice.route'
const router = Router();
 
router.use('/api/v1/notice',noticeRoutes);
export default router;