import { createServer } from "./index";
import serverless from "serverless-http";

const app = createServer();

// Vercel için klasik sunucu başlatma ve statik dosya sunumu kaldırıldı
// Sadece API handler export edilir
export default serverless(app);
