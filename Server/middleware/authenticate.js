import jwt from 'jsonwebtoken';

const authenticate = (req, res) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token.split("")[1], process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid or Expired Token." });
    }
}

export default authenticate;