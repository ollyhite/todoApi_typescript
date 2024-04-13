import { Request, Response, Router } from "express";
import { TasksController } from "./tasks.controller";

//fire the router func
export const tasksRouter: Router = Router();

tasksRouter.get("/tasks", (req: Request, res: Response) => {
  const tasksController = new TasksController();
  tasksController.getAll();
  //   res.send("Express typescript server ");
});
