import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../repository/AuthRepository.js';

class AuthError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const registerUser = async (name, email, password) => {

  const existing = await findUserByEmail(email);
  if (existing) {
    throw new AuthError('Email já cadastrado', 409);
  }

  const user = await createUser(name, email, password);
  const token = generateToken(user);
  
  return { user, token };
};


export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new AuthError('Credenciais inválidas', 401);
    }

    if (password !== user.password) {
        throw new AuthError('Credenciais inválidas', 401);
    }

    const token = generateToken(user);
    
    return { user, token };
};

function generateToken(user) {
  return jwt.sign({ id: user.id }, 'your-secret-key', {
    expiresIn: '1h'
  });
}
