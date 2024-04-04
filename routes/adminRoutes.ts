import express from "express";
import {
  deleteAdmin,
  getAdmins,
  loginAdmin,
  registerAdmin,
  updateAdmin,
} from "../controller/adminController";
import { validateToken } from "../middleware/validateTokenHandler";

const router = express.Router();

// To apply to all 
router.all("/login",validateToken)
router
  .route("/")
  .get(getAdmins)
  .post(registerAdmin)
  .put(updateAdmin);
router.route("/login").post(loginAdmin);
router.route("/:id").delete(deleteAdmin);

module.exports = router;