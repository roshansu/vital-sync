// middleware/rateLimiter.js
import rateLimit from "express-rate-limit"
 const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins

  max: 5,

  message: {
    success: false,
    message:
      "Too many login attempts. Try again later.",
  },
});

export default authLimiter