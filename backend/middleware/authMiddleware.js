// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   // Check if the authorization header exists
//   const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

//   if (!token) {
//     return res.status(401).send({ status: false, message: "Access denied. No token provided." });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, "AppointmentSecretKey");
//     req.user = decoded; // Attach decoded token data (e.g., user ID) to the request
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     res.status(400).send({ status: false, message: "Invalid token." });
//   }
// };

// module.exports = authMiddleware;

// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(" ")[1]; // Expecting "Bearer <token>"

//   if (!token) {
//     console.log("No token provided in request headers.");
//     return res
//       .status(401)
//       .send({
//         status: false,
//         message: "Access denied. No token provided.",
//       });
//   }

//   try {
//     const decoded = jwt.verify(token, "AppointmentSecretKey");
//     req.user = decoded; // Attach decoded data (e.g., user ID) to the request
//     console.log("Token verified successfully:", decoded); // Debugging output
//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     console.log("Token verification failed:", error.message);
//     res
//       .status(400)
//       .send({ status: false, message: "Invalid token." });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    console.log("No token provided in request headers.");
    return res.status(401).send({
      status: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, "AppointmentSecretKey");
    req.user = decoded; // Attach decoded data (e.g., user ID) to the request
    console.log("Token verified successfully:", decoded); // Debugging output
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("Token verification failed:", error.message);
    res
      .status(400)
      .send({ status: false, message: "Invalid token." });
  }
};

module.exports = authMiddleware;
