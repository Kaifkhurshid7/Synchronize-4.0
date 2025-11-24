import { Router } from "express";
import { contactTeam } from "../controllers/mailControllers.js";

const router = Router();

router.post("/", (req, res) => {
    res.status(200).json({ message: "Mail Route is Working" });
});
router.post("/contact", contactTeam);

export default router;