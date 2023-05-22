import { registerUser, loginUser, spotifyLogin } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/spotifyLogin", spotifyLogin);

export default router;
