import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'Token ausente' });

  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Token inválido' });

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};