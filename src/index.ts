// src/index.ts
import app from './app.js';

const PORT = process.env.PORT || 3001;

if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`\n🚀 TaskFlow API running at http://localhost:${PORT}`);
        console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
        console.log(`📋 Todos endpoint: http://localhost:${PORT}/api/todos\n`);
    });
}