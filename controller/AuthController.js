import { registerUser, loginUser } from '../services/AuthService.js';

// Não precisamos mais do 'bcrypt' ou 'PrismaClient' aqui.

export const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const { user, token } = await registerUser(name, email, password);
    
    res.status(201).json({ 
      user: { id: user.id, name: user.name, email: user.email }, 
      token 
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({ 
      message: error.message || 'Erro interno no servidor' 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password); // Novo método na Service
    
    res.json({ 
      user: { id: user.id, name: user.name, email: user.email }, 
      token 
    });
  } catch (error) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({ 
      message: error.message || 'Erro interno no servidor' 
    });
  }
};