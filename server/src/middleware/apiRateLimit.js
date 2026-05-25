// middleware/rateLimiter.js

import rateLimit from "express-rate-limit";

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 100, // max 100 requests

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },

  standardHeaders: true,

  legacyHeaders: false,
});

export default apiLimiter