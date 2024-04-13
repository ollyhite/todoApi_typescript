import { body, ValidationChain } from "express-validator";
import { Priority } from "../enums/priority";
import { Status } from "../enums/Status";

export const createValidator: ValidationChain[] = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("The task title mandatory")
    .trim()
    .isString()
    .withMessage("Title need to be in text format"),
  body("date")
    .not()
    .isEmpty()
    .withMessage("The task data mandatory")
    .isString()
    .withMessage("Task data need to be a valid date format"),
  body("description")
    .trim()
    .isString()
    .withMessage("Task description need to be in text format"),
  body("priority")
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage("Priority can only be normal, high or low"),
  body("status")
    .trim()
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage("Priority can only be todo, in progress or completed"),
];
