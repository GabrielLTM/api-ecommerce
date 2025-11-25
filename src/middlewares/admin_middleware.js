import jwt from 'jsonwebtoken';

export const adminMiddleware = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'Token ausente' });

  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Token inválido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Rota exclusiva para administradores.' });
    }
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};