import jwt from 'jsonwebtoken';

export default function verifyJWT(req, res, next) {
    const header = req.headers.authorization || req.headers.Authorization; // Get the Authorization header
    if (!header) return next(); // no token, continue

    const token = header.replace(/^Bearer\s+/i, '');

    jwt.verify(token, process.env.JWT_SECRET || 'randomsecret', (err, decoded) => { // Use environment variable for secret
        if (err) {
            console.error('JWT verification failed:', err.message);
            return res.status(403).json({ message: 'Invalid or expired token' });
        } 

        req.user = decoded; // attach decoded token to request
        console.log('JWT decoded:', decoded); // Log decoded token for debugging
        next();
    });
}
 // end of file