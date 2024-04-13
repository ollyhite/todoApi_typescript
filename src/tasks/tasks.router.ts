import { Request, Response, Router } from "express";
import { TasksController } from "./tasks.controller";

//fire the router func
export const tasksRouter: Router = Router();

tasksRouter.get("/tasks", async (req: Request, res: Response) => {
  const tasksController = new TasksController();
  const allTasks = await tasksController.getAll();
  // res.send("Express typescript server ");
  res.json(allTasks).status(200);
});
