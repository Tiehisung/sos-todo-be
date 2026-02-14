import { Router } from "express";
import {
    getTodos,
    createTodo,
    deleteTodo
} from "../controllers/todo.controller.js";

const router = Router();

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
