const requests = new Map();

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requests.has(ip)) {
    requests.set(ip, []);
  }

  const timestamps = requests.get(ip).filter(
    (time) => now - time < 60000
  );

  timestamps.push(now);
  requests.set(ip, timestamps);

  if (timestamps.length > 10) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please wait."
    });
  }

  next();
};

export default rateLimiter;
