import { sendDailyLogMail, resetDailyLogs } from '../lib/contact-log';

// Her dakika kontrol ederek 03:00'te işlemi başlat
function scheduleDailyTask() {
  setInterval(async () => {
    const now = new Date();
    if (now.getHours() === 3 && now.getMinutes() === 0) {
      await sendDailyLogMail();
      resetDailyLogs();
    }
  }, 60 * 1000); // Her dakika kontrol
}

scheduleDailyTask();
