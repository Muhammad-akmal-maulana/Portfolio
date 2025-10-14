import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Ambil token dari header Authorization

  try {
    // gunakan same secret yang dipakai saat sign (ganti "SECRET_KEY" dengan process.env.JWT_SECRET jika sudah set)
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.adminId = decoded.id;
    next();
    
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
}