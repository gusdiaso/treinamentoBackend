import { FastifyInstance } from "../../node_modules/fastify/fastify";


export default function roomRoutes(app:FastifyInstance ) {


    interface Room {
        id: string
        nome: string
        capacidade: number
        local: string
        descricao: string
    }

    let rooms:Room[] = []


    app.get("/rooms", (request, reply) => {
        reply.send(rooms)
    })

    app.post("/room", (request, reply) => {
        const { id, nome, capacidade, local, descricao} = request.body as Room;

        if (!id || !nome || !capacidade || !local || !descricao) {
            return reply.status(400).send({ error: "All fields are required" });
        }

        rooms.push({ id, nome, capacidade, local, descricao });
        reply.status(201).send({ message: "Room created successfully"});
    });

    app.put("/room/:id", (request, reply) => {
        const { id } = request.params as { id: string };
        const { nome, capacidade, local, descricao } = request.body as Room;

        const roomIndex = rooms.findIndex(room => room.id === id);

        if (roomIndex === -1) {
            return reply.status(404).send({ error: "Room not found" });
        }

        if (!nome || !capacidade || !local || !descricao) {
            return reply.status(400).send({ error: "All fields are required" });
        } else {
            rooms[roomIndex] = { id, nome, capacidade, local, descricao };
            reply.send({ message: "Room updated successfully" });
        }
    });

    app.delete("/room/:id", (request, reply) => {
        const { id } = request.params as Room;

        const roomIndex = rooms.findIndex(room => room.id === id);

        if (roomIndex === -1) {
            return reply.status(404).send({ error: "Room not found" });
        } else {
            rooms = rooms.filter(room => room.id !== id);
            reply.send({ message: "Room deleted successfully" });
        }
        
    });

}