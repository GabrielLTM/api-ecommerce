import { users } from '../../database/index.js';

let idCounter = 1;

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const findUserByEmail = async (email) => {
  return users.find(user => user.email === email);
};

export const createUser = async (name, email, password) => {
  if (users.some(user => user.email === email)) {
    throw new CustomError('Email already exists', 409);
  }
  const newUser = { id: idCounter++.toString(), name, email, password };
  users.push(newUser);
  return newUser;
};
