
import { FaWhatsapp } from 'react-icons/fa';

// Vite .env parametreleri
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '905555555123';
const whatsappMessage = import.meta.env.VITE_WHATSAPP_MESSAGE || 'Merhaba! ';

function getWhatsappUrl() {
    const number = whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(whatsappMessage);
    return `https://wa.me/${number}?text=${message}`;
}

export default function WhatsappButton() {
    return (
        <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 left-2 md:left-16 z-50 bg-green-500 text-white rounded-full p-3 shadow-lg flex items-center gap-2 hover:bg-green-600 transition-colors animate-pulse"
            aria-label="WhatsApp ile iletişim kur"
        >
            <FaWhatsapp className="w-6 h-6 animate-spin-slow" />
            <span className="font-semibold hidden md:inline">WhatsApp</span>
        </a>
    );
}
