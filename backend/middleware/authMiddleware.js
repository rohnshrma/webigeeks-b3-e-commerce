import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

// protect routes
const protect = async (req, res, next) => {
  console.log("running protect");

  let token;
  // read the jwt from the cookie
  try {
    token = await req.cookies.jwt;
    console.log("TOKEN", token);
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.userId).select("-password");
        next();
      } catch (error) {
        res.status(401).json({ error: "Not Authorised , no token" });
      }
    }
  } catch (err) {
    res.status(401);
    res.status(401).json({ error: "Not Authorised , no token" });
  }
};

// admin middleware

const admin = (req, res, next) => {
  console.log("running adming");
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Not Authorised as admin" });
  }
};

export { admin, protect };
