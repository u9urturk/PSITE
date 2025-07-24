import rateLimit from 'express-rate-limit';

// 15 dakika içinde maksimum 5 istek
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // Maksimum 5 istek
  message: {
    error: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
