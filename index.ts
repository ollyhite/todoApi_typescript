// const express = require("express");
//typescript import express
import express, { Express } from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import cors from "cors";
import bodyParser from "body-parser";
import { Task } from "./src/tasks/tasks.entity";
import { tasksRouter } from "./src/tasks/tasks.router";

//instantiate express app
// const app = express();
const app: Express = express();
dotenv.config();

//Parse request Body
app.use(bodyParser.json());

//use cors install types as well
app.use(cors());

//create data source connection
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

//define server port
const port = process.env.PORT;
//create a default route
// app.get("/", (req, res) => {
//   console.log("server get data");
//   res.send("Express typescript server ");
// });

// app.get("/", (req: Request, res: Response) => {
//   console.log("server get data");
//   res.send("Express typescript server ");
// });

AppDataSource.initialize()
  .then(() => {
    //star listening to the requests on the defined port
    app.listen(port, () => console.log(`Listening on port ${port}`));
    console.log("Data source has been initialize");
  })
  .catch((err) => console.log("err during data source initialize", err));

app.use("/", tasksRouter);
