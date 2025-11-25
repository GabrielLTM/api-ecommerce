import { registerUser, loginUser } from '../services/auth_service.js';

const JWT_SECRET = "SEGREDO_SUPER_SECRETO_AULA11";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser(name, email, password);
    res.status(201).json({ 
      user: { id: user.id, name: user.name, email: user.email }, 
      token 
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.json({ 
      user: { id: user.id, name: user.name, email: user.email }, 
      token 
    });
  } catch (error) {
    next(error);
  }
};

