// src/controllers/todo.controller.ts - Improved version
import type { Request, Response } from "express";
import { todos } from "../data/todos.js";
import { randomUUID } from "crypto";

// GET todos
export const getTodos = (_: Request, res: Response) => {
    try {
        console.log("GET /api/todos");
        res.json({
            success: true,
            data: todos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to fetch todos"
        });
    }
};

// CREATE todo
export const createTodo = (req: Request, res: Response) => {
    try {
        const { text } = req.body;

        // Validation
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: "Text is required and must be a non-empty string"
            });
        }

        const newTodo = {
            id: randomUUID(),
            text: text.trim(),
            completed: false,
        };

        todos.push(newTodo);
        res.status(201).json({
            success: true,
            data: newTodo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to create todo"
        });
    }
};

// DELETE todo
export const deleteTodo = (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const index = todos.findIndex(t => t.id === id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                error: "Todo not found"
            });
        }

        todos.splice(index, 1);
        res.json({
            success: true,
            message: "Todo deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to delete todo"
        });
    }
};