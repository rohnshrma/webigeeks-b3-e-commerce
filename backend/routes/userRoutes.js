import express from "express";
import userController from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(protect, admin, userController.GET_USERS)
  .post(userController.REGISTER_USER);

router.post("/logout", protect, userController.LOGOUT_USER);
router.post("/auth", userController.AUTH_USER);
router
  .route("/profile")
  .get(protect, userController.GET_USER_PROFILE)
  .put(protect, userController.UPDATE_USER_PROFILE);

router
  .route("/:id")
  .delete(protect, admin, userController.DELETE_USER)
  .get(protect, admin, userController.GET_USER_BY_ID)
  .put(protect, admin, userController.UPDATE_USER);

export default router;
