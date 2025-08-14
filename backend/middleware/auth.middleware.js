import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protect = async (req, res, next) => {
  let token;

  try {
    // Checking for token in cookies
    if (req.cookies.token) {
      token = req.cookies.token;

      // Verifying token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password"); // storing user details except password

      next();
    } else {
      res.status(401);
      return res.json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    return res.json({ message: "Not authorized, token failed" });
  }
};

export { protect };
