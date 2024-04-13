import { Request, Response, Router } from "express";
import { TasksController } from "./tasks.controller";
import { createValidator } from "./tasks.validator";
import { validationResult } from "express-validator";

//fire the router func
export const tasksRouter: Router = Router();

tasksRouter.get("/tasks", async (req: Request, res: Response) => {
  const tasksController = new TasksController();
  const allTasks = await tasksController.getAll();
  // res.send("Express typescript server ");
  res.json(allTasks).status(200);
});

tasksRouter.post(
  "/tasks",
  createValidator,
  //@ts-ignore
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);
