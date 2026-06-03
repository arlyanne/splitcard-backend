import prisma from "../config/prisma.js";

class UserRepository {

    // Método para encontrar um usuário por email
    async findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        }); 
    }

    // Método para criar um novo usuário
    async create(data) {
        return prisma.user.create({
            data,
        });
    }

    // Método para encontrar um usuário por ID
    async findById(id) {
        return prisma.user.findUnique({
            where: { id },
        }); 
    }
}

export default new UserRepository();