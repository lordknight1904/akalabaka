import { Router } from 'express';
import * as CityController from '../controllers/city.controller';
const router = new Router();

// Get all Posts
router.route('/city').get(CityController.getCities);
router.route('/city').post(CityController.createCity);

export default router;
