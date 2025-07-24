import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

let __filename, __dirname;
if (typeof __filename === 'undefined' || typeof __dirname === 'undefined') {
  __filename = __filename || __filename;
  __dirname = __dirname || process.cwd();
}

const LOG_DIR = path.resolve(__dirname, '../../logs');
// LOG_FILE artık gün bazlı isimlendirilir
function getLogFileName() {
  const now = new Date();
  // Gün 03:00'dan önce ise bir önceki günün dosyasını kullan
  let date = new Date(now);
  if (now.getHours() < 3) {
    date.setDate(now.getDate() - 1);
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return path.join(LOG_DIR, `contact-requests-${day}.${month}.${year}.txt`);
}

// IP bazlı günlük istek listesi
export const dailyIpRequests: Record<string, number> = {};

// Log kaydı ekle
export function logContactRequest(ip: string, email?: string) {
  dailyIpRequests[ip] = (dailyIpRequests[ip] || 0) + 1;
  const now = new Date();
  const emailPart = email ? ` | ${email}` : '';
  const logLine = `${now.toLocaleString('tr-TR', { hour12: false })} | ${ip}${emailPart}\n`;
  const logFile = getLogFileName();
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);
  if (!fs.existsSync(logFile)) {
    // Dosya başına tarih/zaman damgası ekle
    const header = `Günlük Log: ${logFile.split('-')[2].replace('.txt','')} 03.00\n`;
    fs.writeFileSync(logFile, header);
  }
  fs.appendFileSync(logFile, logLine);
}

// Günlük logu txt olarak mail at
export async function sendDailyLogMail() {
  const logFile = getLogFileName();
  if (!fs.existsSync(logFile)) return;
  const logContent = fs.readFileSync(logFile, 'utf-8');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: `Günlük İletişim Formu Logu (${logFile.split('-')[2].replace('.txt','')})`,
    text: logContent,
    attachments: [
      {
        filename: logFile.split(LOG_DIR + path.sep)[1],
        content: logContent
      }
    ]
  });
}

// Logu ve ip listesini sıfırla
export function resetDailyLogs() {
  const logFile = getLogFileName();
  if (fs.existsSync(logFile)) fs.unlinkSync(logFile);
  for (const ip in dailyIpRequests) delete dailyIpRequests[ip];
}
