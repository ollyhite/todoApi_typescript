import { validationResult } from "express-validator";
import { AppDataSource } from "../../index";
import { Task } from "./tasks.entity";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

class TasksController {
  //   constructor(private taskRepository = AppDataSource.getRepository(Task)) {}

  //  // @ts-ignore how to ignore ts error
  // method for the get route
  public async getAll(req: Request, res: Response): Promise<Response> {
    // Declare a variable to hold all tasks
    let allTasks: Task[];

    // Fetch all tasks using the repository
    try {
      //allTasks = await this.taskRepository.find
      allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: "ASC",
        },
      });
      //   console.log(allTasks);

      // Convert the tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];
      //   return allTasks;
      return res.json(allTasks).status(200);
    } catch (_errors) {
      //   console.log(errors);
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  }

  // method for the post route
  public async create(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //create a new instance of the Task
    const newTask = new Task();
    // add the required properties to the Task object
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;
    // add the new task to the database
    let createTask: Task;
    try {
      createTask = await AppDataSource.getRepository(Task).save(newTask);

      //convert the task instance to an object
      createTask = instanceToPlain(createTask) as Task;
      return res.json(createTask).status(201);
    } catch (errors) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  }
}

export const tasksController = new TasksController();
