import express from "express";
import {
    getTask,
    createTask,
    updateTask,
    deleteTask
} from "../controller/TaskController.js";

import TaskValidator from "../validator/TaskValidator.js";

const taskRouter = express.Router();

taskRouter.get('/task', getTask);
taskRouter.post('/task',TaskValidator.validateCreateTask(), createTask);
taskRouter.put('/task/:id', updateTask);
taskRouter.delete('/task/:id', deleteTask);

export default taskRouter;