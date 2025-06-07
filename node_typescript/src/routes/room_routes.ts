import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma';

interface Room {
    id: string
    nome: string
    capacidade: number
    local: string
    descricao: string
}

export default async function roomRoutes(app:FastifyInstance ) {


    app.get("/room", async(request, reply) => {
        
        try {
            const rooms = await prisma.room.findMany()
            return reply.send(rooms)
            
        } catch (error) {
            return reply.status(500).send({ error: "Error fetching rooms" });
        }

    })

    app.post("/room", async (request, reply) => {
        const {nome, capacidade, local, descricao} = request.body as Room & { slug: string };

        if (!nome || !capacidade || !local) {
            return reply.status(400).send({ error: "All fields are required, except descrição" });
        }

        try {
            const newRoom = await prisma.room.create({
                data: {
                    nome,
                    capacidade,
                    local,
                    descricao
                }
            });

            return reply.status(201).send(newRoom);
    
        } catch (error) {
            
            return reply.status(500).send({ error: "Room not created" });
        
        }   
    });

    app.put("/room/:id", async(request, reply) => {
        const { id } = request.params as Room;
        const { nome, capacidade, local, descricao } = request.body as Room;
        const roomId = parseInt(id);
        
        try {
            const updatedRoom = await prisma.room.update({
                where: { id: roomId },
                data: {
                    nome,
                    capacidade,
                    local,
                    descricao
                }
            });

            if (!updatedRoom) {
                return reply.status(404).send({ error: "Room not found" });
            }
            
            return reply.status(200).send(updatedRoom);

            
        } catch (error) {
            return reply.status(500).send({ error: "Error updating room" });
        }
        
    });

    app.delete("/room/:id", async(request, reply) => {
        const { id } = request.params as Room;
        const roomId = parseInt(id);

        try {
            const deletedRoom = await prisma.room.delete({
                where: { id: roomId }
            });

            if (!deletedRoom) {
                return reply.status(404).send({ error: "Room not found" });
            }
            
            return reply.status(200).send(deletedRoom);

        } catch (error) {

            return reply.status(500).send({ error: "Error deleting room" });
        }
        
    });

}