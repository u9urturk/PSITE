import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton({ position = 'right' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 ${
        position === 'right' ? 'right-8' : 'left-8'
      } z-50 bg-nature-600 text-white rounded-full p-3 shadow-lg hover:bg-nature-700 transition-colors animate-bounce`}
      aria-label="Yukarı Çık"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}
