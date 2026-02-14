// src/app.ts
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.route.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api', todoRoutes);

// Root route
app.get('/', (_req, res) => {
    res.json({
        name: 'TaskFlow API',
        version: '1.0.0',
        description: 'Todo management API',
        endpoints: {
            todos: '/api/todos'
        }
    });
});

// Health check route
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Route not found: ${req.method} ${req.path}`
    });
});

export default app;