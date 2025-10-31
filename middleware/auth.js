import jwt from 'jsonwebtoken';
export default function verifyJWT (req, res, next){
    const header = req.headers['authorization'] || req.headers['Authorization'];
    if (header != null) {
        const token = header.replace(/^Bearer\s+/i, '');
        jwt.verify(token, 'randomsecret', (err, decoded) => {
            if (err) {
                console.error('JWT verification failed:', err.message);
                // don't attach user if token invalid
            } else if (decoded) {
                req.user = decoded;
                console.log('JWT decoded:', decoded);
            }
            // continue regardless of token validity
            return next();
        });
        return; // jwt.verify callback will call next()
    }

    // No Authorization header: continue without a user
    return next();
}