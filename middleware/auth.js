import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'randomsecret';

export default function verifyJWT(req, res, next) {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header) return next();

    const token = header.replace(/^Bearer\s+/i, '');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT verification failed:', err.message);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded;
        console.log('JWT decoded:', decoded);
        next();
    });
}