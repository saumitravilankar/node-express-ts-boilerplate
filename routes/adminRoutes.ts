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
// router.all("/",validateToken)
router
  .route("/")
  .get(getAdmins)
  .post(validateToken, registerAdmin)
  .put(validateToken, updateAdmin);
router.route("/login").post(loginAdmin);
router.route("/:id").delete(validateToken, deleteAdmin);

module.exports = router;
