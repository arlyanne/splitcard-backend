import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";

class UserService {

  // Método para registrar um novo usuário
  async register({ name, email, password }) {
    const userExists = await userRepository.findByEmail(email);

    if (userExists) {
      throw new Error("Usuário já existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  // Método para login do usuário
  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  // Método para obter o perfil do usuário
  async getProfile(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

export default new UserService();
