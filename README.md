# YeşilRulo Fusion Starter

YeşilRulo, modern bir rulo çim üreticisi için hazırlanmış, tam entegre bir full-stack React + Express uygulamasıdır. SPA tabanlı frontend, API destekli backend, e-posta ve WhatsApp entegrasyonu, rate limit ve günlük loglama özellikleriyle üretime hazırdır.

## Özellikler
- **Frontend:** React 18, TypeScript, Vite, TailwindCSS, SPA routing
- **Backend:** Express, TypeScript, API endpoint'leri, rate limit, günlük loglama, e-posta bildirimleri
- **UI:** Modern ve mobil uyumlu arayüz, Toast bildirimleri, loading overlay, scroll-to-top ve WhatsApp butonu
- **Entegrasyonlar:** WhatsApp yönlendirme (.env ile), SMTP e-posta, Netlify Functions desteği
- **Test:** Vitest ile birim testler

## Proje Yapısı
```
client/         # React SPA
  pages/        # Route bileşenleri (Index.tsx = ana sayfa)
  components/ui # UI kütüphanesi
  App.tsx       # SPA routing
  global.css    # Tailwind teması
server/         # Express API
  index.ts      # Sunucu ana dosyası
  routes/       # API endpoint'leri
shared/         # Ortak tipler
  api.ts        # API interface örneği
netlify/functions/ # Netlify sunucu fonksiyonları
```

## Kurulum
1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Ortam değişkenlerini `.env` dosyasına ekleyin:
   ```env
   VITE_WHATSAPP_NUMBER=905555555123
   VITE_WHATSAPP_MESSAGE=Merhaba! YeşilRulo ile iletişime geçmek istiyorum.
   SMTP_HOST=...
   SMTP_USER=...
   SMTP_PASS=...
   SMTP_FROM=...
   SMTP_TO=...
   ```
3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
4. Üretim için derleyin:
   ```bash
   npm run build
   ```

## Netlify Deploy
- `dist/spa` klasörünü Netlify'da "Publish directory" olarak seçin.
- Sunucu fonksiyonları için `netlify/functions` klasörünü ekleyin.
- Ortam değişkenlerini Netlify panelinden tanımlayın.

## Kullanım
- Ana sayfa: Modern tanıtım, ürünler, portfolyo, iletişim formu
- İletişim formu: Rate limit, e-posta bildirimi, günlük log
- WhatsApp butonu: .env ile numara ve mesaj ayarlanabilir

## Geliştirme Komutları
```bash
npm run dev        # Geliştirme sunucusu
npm run build      # Üretim derlemesi
npm run start      # Üretim sunucusu
npm run typecheck  # TypeScript kontrolü
npm test           # Birim testler
```

## Lisans
MIT
