import { Router } from 'express';
import * as DistrictController from '../controllers/district.controller';
const router = new Router();

// Get all Posts
router.route('/district/:city').get(DistrictController.getDistricts);
router.route('/district').post(DistrictController.createDistrict);

export default router;
