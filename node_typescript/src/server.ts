import fastify from 'fastify';
import roomRoutes from './routes/room_routes.js';

const app = fastify();
app.register(roomRoutes);

app.get('/', async () => {
    return 'You are in the Room API!';
});

app.listen({ port: 3333}).then(() => {
    console.log('HTTP server running on http://localhost:3333');
}); 
