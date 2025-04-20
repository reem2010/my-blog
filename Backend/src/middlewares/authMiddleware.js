import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.cookies["token"];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Access denied" });
  }
}
export default verifyToken;
