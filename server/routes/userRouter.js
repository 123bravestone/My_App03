import express from "express";
import {
  addMonthAmount,
  addUserExpense,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

router
  .post("/add_expense", addUserExpense)
  .post("/create-user", createUser)
  .post("/add_monthAmount", addMonthAmount);

export default router;
