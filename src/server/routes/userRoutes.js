const router = require('../router');

const UserController = require('../controllers/userController');

router.post('/user/find_or_create', UserController.findOrCreate);
