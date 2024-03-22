import express from "express";
import {
  deleteAdmin,
  getAdmins,
  registerAdmin,
  updateAdmin,
} from "../controller/adminController";

const router = express.Router();

router.route("/").get(getAdmins).post(registerAdmin).put(updateAdmin);
router.route("/:id").delete(deleteAdmin);

module.exports = router;
