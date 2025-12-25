import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    const decrypted = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decrypted.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: "is auth error" });
  }
};
