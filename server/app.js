import express from "express";
import cors from "cors";
import taskRouter from "./routes/TaskRoute.js";


const app = express();
app.use(cors());

app.use(express.json()); 

app.use(taskRouter);

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});