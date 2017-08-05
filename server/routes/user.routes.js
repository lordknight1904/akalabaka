import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

router.route('/user/auth/social').post(UserController.authUser);
router.route('/user/auth').post(UserController.createUser);
router.route('/user/auth/login').post(UserController.login);
router.route('/user/auth/relogin').post(UserController.relogin);

router.route('/user/update/job').post(UserController.updateJob);
router.route('/user/update/about').post(UserController.updateAbout);
router.route('/user/update/student').post(UserController.updateStudent);
router.route('/user/update/teaching').post(UserController.updateTeaching);
router.route('/user/update/name').post(UserController.updateName);
router.route('/user/update/nationality').post(UserController.updateNationality);
router.route('/user/update/gender').post(UserController.updateGender);
router.route('/user/update/year').post(UserController.updateYearOfBirth);
router.route('/user/update/marks').post(UserController.updateMarks);
router.route('/user/update/address').post(UserController.updateAddress);
router.route('/user/update/fee').post(UserController.updateFee);

router.route('/user/banner').post(UserController.uploadBanner);
router.route('/user/avatar').post(UserController.uploadAvatar);

router.route('/search').get(UserController.search);
router.route('/chat/:id').get(UserController.getChat);
router.route('/user/read').post(UserController.readMessage);

router.route('/user/like').post(UserController.like);
router.route('/user/follow').post(UserController.follow);
router.route('/user/unlike').post(UserController.unlike);
router.route('/user/unfollow').post(UserController.unfollow);

router.route('/user/:id').get(UserController.getUser);

export default router;
