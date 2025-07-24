import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { contactLimiter } from "./contact-limiter";
import { logContactRequest } from "../lib/contact-log";
dotenv.config();

// Bu alanları kendi SMTP bilgilerinize göre doldurun
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
export const handleContact: RequestHandler = async (req, res) => {
    // IP loglama ve günlük limitleme
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || '';
    const { name, surname, email, phone, area, details } = req.body;
    logContactRequest(email);
    // IP tabanlı rate limit devre dışı

    if (!name || !surname || !email || !phone) {
        return res.status(400).json({ error: "Zorunlu alanlar eksik." });
    }

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.SMTP_TO,
            subject: 'Yeni İletişim Formu Kaydı',
            html: `
        <h2>Yeni İletişim Formu Kaydı</h2>
        <p><b>Ad:</b> ${name}</p>
        <p><b>Soyad:</b> ${surname}</p>
        <p><b>E-posta:</b> ${email}</p>
        <p><b>Telefon:</b> ${phone}</p>
        <p><b>Alan Büyüklüğü:</b> ${area}</p>
        <p><b>Proje Detayları:</b> ${details}</p>
      `
        });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "E-posta gönderilemedi." });
    }
};

// Rate limiting ile birlikte kullanılacak dizi
export const contactRateLimited = [contactLimiter, handleContact];
