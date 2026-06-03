import userService from "../services/user.service.js";

class UserController {

// Método para registrar um novo usuário
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const user = await userService.register({
        name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // Método para login do usuário
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await userService.login({
        email,
        password,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // Método para obter o perfil do usuário
  async getProfile(req, res) {
    try {
      const { id } = req.user;

      const user = await userService.getProfile(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  
}

export default new UserController();
