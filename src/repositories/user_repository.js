import { users } from '../database/index.js';

export const getUser = async (userId) => {
  const user = users.find(u => u.id === userId);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

export const getAllUsers = async () => {
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
}