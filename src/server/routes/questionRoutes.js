const router = require('../router');

const QuestionController = require('../controllers/questionController');
const { verifyJwt } = require('../middlewares/auth');

router.post('/ask_question', verifyJwt, QuestionController.askQuestion);
