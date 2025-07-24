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
function getLogFileName() {
  const now = new Date();
  let date = new Date(now);
  if (now.getHours() < 3) {
    date.setDate(now.getDate() - 1);
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return path.join(LOG_DIR, `contact-requests-${day}.${month}.${year}.txt`);
}

function isProduction() {
  return process.env.NETLIFY === 'true' || process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
}

// Günlük istek sayacı (devre dışı)
export let dailyRequestCount = 0;

// Log kaydı ekle
export function logContactRequest(email?: string) {
  // Log sistemi devre dışı
  return;
}
// Günlük logu txt olarak mail at
export async function sendDailyLogMail() {
  // Log iletim sistemi devre dışı
  return;
}
// Logu ve ip listesini sıfırla
export function resetDailyLogs() {
  // Log sıfırlama devre dışı
  return;
}
