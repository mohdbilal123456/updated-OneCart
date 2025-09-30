import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ message: "Not Authorized, Login Again" });
    }

    // Correct usage of jwt.verify
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // Token verify hone ke baad, admin email set karo
    req.adminEmail = process.env.ADMIN_EMAIL;

    next();
  } catch (error) {
    console.log("adminAuth error", error);
    return res.status(500).json({ message: `adminAuth error ${error}` });
  }
};

export default adminAuth;
