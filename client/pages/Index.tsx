import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '../assets/herosection.png';
import expImage from '../assets/exp.png';
import ps1 from '../assets/ps1.png';
import ps2 from '../assets/ps2.png';
import ps3 from '../assets/ps3.png';
import Loading from '@/components/ui/loading';
import ScrollToTopButton from '@/components/ui/scrolltop';
import WhatsappButton from '@/components/ui/whatsapp';




import { 
  Leaf, 
  Award, 
  Truck, 
  Shield, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin,
  ChevronDown,
  Play,
  CheckCircle2
} from 'lucide-react';

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Talebiniz başarıyla iletildi!");
        form.reset();
      } else {
        toast.error("Bir hata oluştu: " + (result.error || "Gönderilemedi"));
      }
    } catch {
      toast.error("Sunucuya ulaşılamadı. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Typewriter effect for animated headline
  const typewriterWords = [
    "Doğal Yeşillik",
    "Canlı Bahçeler",
    "Taze Çim Alanlar",
    "Yeşil Dönüşüm"
  ];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(80);

  useEffect(() => {
    const currentWord = typewriterWords[currentWordIdx];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && displayedText.length < currentWord.length) {
      setTypeSpeed(80);
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, typeSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      setTypeSpeed(40);
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }, typeSpeed);
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % typewriterWords.length);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIdx]);



  return (
    <div className="min-h-screen bg-gradient-to-b from-nature-50 to-white">
      {isLoading && <Loading />}
      <ScrollToTopButton position="right" />
      <WhatsappButton />
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-nature-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-nature-600" />
              <span className="text-xl font-bold text-nature-800">YeşilRulo</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-nature-700 hover:text-nature-900 transition-colors"
              >
                Ana Sayfa
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-nature-700 hover:text-nature-900 transition-colors"
              >
                Hakkımızda
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="text-nature-700 hover:text-nature-900 transition-colors"
              >
                Ürünler
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-nature-700 hover:text-nature-900 transition-colors"
              >
                Portfolyo
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-nature-700 hover:text-nature-900 transition-colors"
              >
                İletişim
              </button>
            </div>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-nature-600 hover:bg-nature-700 text-white"
            >
              Teklif Al
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative pt-20 pb-16 overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Sol: Metin */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}> 
              <Badge className="mb-4 bg-nature-100 text-nature-900 hover:bg-nature-200">
                <Leaf className="w-4 h-4 mr-2 text-nature-600" />
                Türkiye'nin Önde Gelen Rulo Çim Üreticisi
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-lg">
                <span className="inline-block text-nature-800">
                  {displayedText}
                </span>
                <span className="text-nature-600 block mt-2">Her Mevsim</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed drop-shadow">
                Premium kalitede rulo çim üretimi ile bahçenizi hayallerinizdeki yeşil cennete dönüştürüyoruz. 
                <span className="text-orange-500 font-semibold">15 yıllık deneyimimizle</span> her proje için özel çözümler sunuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-nature-600 hover:bg-nature-700 text-white group"
                  onClick={() => scrollToSection('products')}
                >
                  Ürünlerimizi Keşfet
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-nature-600 text-nature-600 hover:bg-nature-50 group"
                  onClick={() => scrollToSection('portfolio')}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Projelerimizi İzle
                </Button>
              </div>
            </div>
            {/* Sağ: Modern görsel kutusu */}
            <div className={`relative transition-all duration-1000 delay-300 flex justify-center items-center ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-nature-200 bg-white max-w-md w-full aspect-[4/3] flex items-center justify-center">
                <img
                  src={expImage}
                  alt="YeşilRulo Hero Görseli"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow">
                  <div className="flex items-center text-nature-800 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 mr-1 text-nature-600" />
                    %100 Doğal
                  </div>
                </div>
              </div>
              {/* Modern floating icons */}
              <div className="absolute -top-4 -left-4 bg-white rounded-full p-4 shadow-lg animate-bounce border border-nature-200">
                <Award className="w-8 h-8 text-nature-600" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-pulse border border-nature-200">
                <Shield className="w-8 h-8 text-nature-600" />
              </div>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-nature-600 hover:text-nature-800 transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-nature-100 text-nature-800">Hakkımızda</Badge>
            <h2 className="text-4xl font-bold text-nature-900 mb-6">15 Yıllık Deneyim, Sınırsız Yeşillik</h2>
            <p className="text-xl text-nature-700 max-w-3xl mx-auto">
              Türkiye'nin her köşesine premium kalitede rulo çim ulaştırıyoruz. Modern üretim tesislerimiz ve uzman ekibimizle 
              bahçe hayallerinizi gerçeğe dönüştürüyoruz.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "Doğal Üretim",
                description: "Tamamen organik yöntemlerle yetiştirilen, kimyasal içermeyen premium çim çeşitleri."
              },
              {
                icon: Truck,
                title: "Hızlı Teslimat", 
                description: "Türkiye genelinde 24-48 saat içinde soğuk zincir teslimat garantisi."
              },
              {
                icon: Shield,
                title: "Kalite Garantisi",
                description: "Tüm ürünlerimizde 2 yıl garanti ve ücretsiz bakım desteği."
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-nature-200 hover:border-nature-400">
                <CardContent className="p-8 text-center">
                  <div className="bg-nature-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-nature-200 transition-colors">
                    <feature.icon className="w-8 h-8 text-nature-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-nature-900 mb-3">{feature.title}</h3>
                  <p className="text-nature-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-nature-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-nature-600 text-white">Ürünlerimiz</Badge>
            <h2 className="text-4xl font-bold text-nature-900 mb-6">Premium Rulo Çim Çeşitlerimiz</h2>
            <p className="text-xl text-nature-700 max-w-3xl mx-auto">
              Her ihtiyaca uygun, farklı iklim koşullarında dayanıklı çim çeşitlerimizi keşfedin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Premium Bermuda",
                features: ["Yüksek Dayanıklılık", "Az Su Tüketimi", "Hızlı Büyüme"],
                price: "₺25/m²",
                image: ps1
              },
              {
                name: "Klasik Karışım", 
                features: ["Genel Kullanım", "Kolay Bakım", "Ekonomik Fiyat"],
                price: "₺18/m²",
                image: ps2
              },
              {
                name: "Spor Sahası",
                features: ["Yoğun Kullanım", "Hızlı İyileşme", "Profesyonel Kalite"],
                price: "₺35/m²",
                image: ps3
              }
            ].map((product, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-nature-200">
                <div className="h-48 relative flex items-center justify-center overflow-hidden rounded-xl">
                  <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-nature-800 font-bold">{product.price}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-nature-900 mb-3">{product.name}</h3>
                  <ul className="space-y-2 mb-4">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-nature-700">
                        <CheckCircle2 className="w-4 h-4 text-nature-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-nature-600 hover:bg-nature-700 text-white"
                    onClick={() => scrollToSection('contact')}
                  >
                    Teklif Al
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-nature-100 text-nature-800">Portfolyo</Badge>
            <h2 className="text-4xl font-bold text-nature-900 mb-6">Başarılı Projelerimiz</h2>
            <p className="text-xl text-nature-700 max-w-3xl mx-auto">
              Türkiye'nin dört bir yanından tamamladığımız projelerle müşterilerimizin hayallerini gerçeğe dönüştürdük.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Lüks Villa Bahçesi",
                location: "İstanbul, Zekeriyaköy",
                area: "850 m²",
                type: "Premium Bermuda",
                image: ps1
              },
              {
                title: "Spor Kompleksi",
                location: "Ankara, Çankaya", 
                area: "2,400 m²",
                type: "Spor Sahası",
                image: ps2
              },
              {
                title: "Okul Bahçesi",
                location: "İzmir, Bornova",
                area: "1,200 m²", 
                type: "Klasik Karışım",
                image: ps3
              },
              {
                title: "Ofis Peyzajı",
                location: "Bursa, Nilüfer",
                area: "650 m²",
                type: "Premium Bermuda",
                image: ps2
              },
              {
                title: "Residence Bahçesi",
                location: "Antalya, Lara",
                area: "1,800 m²",
                type: "Klasik Karışım",
                image: ps1
              },
              {
                title: "Hastane Bahçesi",
                location: "Adana, Seyhan",
                area: "950 m²",
                type: "Premium Bermuda",
                image: ps3
              }
            ].map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-nature-200">
                <div className="h-48 relative flex items-center justify-center overflow-hidden rounded-xl">
                  <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {project.area}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-nature-900 mb-2">{project.title}</h3>
                  <p className="text-nature-700 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {project.location}
                  </p>
                  <p className="text-nature-600 text-sm">Çim Türü: {project.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-nature-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-nature-700 text-white">İletişim</Badge>
              <h2 className="text-4xl font-bold mb-6">Hayalinizdeki Bahçe İçin Bizimle İletişime Geçin</h2>
              <p className="text-xl text-nature-200 mb-8">
                Uzman ekibimiz size en uygun çözümü sunmak için 7/24 hizmetinizde. 
                Ücretsiz keşif ve teklif hizmeti alın.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-nature-400 mr-4" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-nature-300">+90 (212) 555-0123</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-nature-400 mr-4" />
                  <div>
                    <p className="font-medium">E-posta</p>
                    <p className="text-nature-300">info@yesilrulo.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-nature-400 mr-4" />
                  <div>
                    <p className="font-medium">Adres</p>
                    <p className="text-nature-300">Tarım Sitesi, Bahçe Cad. No:45<br />34000 İstanbul</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white text-nature-900">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Ücretsiz Teklif Alın</h3>
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Adınız" 
                      className="w-full p-3 border border-nature-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                      required
                    />
                    <input 
                      type="text" 
                      name="surname"
                      placeholder="Soyadınız" 
                      className="w-full p-3 border border-nature-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="E-posta Adresiniz" 
                    className="w-full p-3 border border-nature-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                    required
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Telefon Numaranız" 
                    className="w-full p-3 border border-nature-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                    required
                  />
                  <input 
                    type="text" 
                    name="area"
                    placeholder="Alan Büyüklüğü (m²)" 
                    className="w-full p-3 border border-nature-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                  />
                  <textarea 
                    name="details"
                    placeholder="Proje Detayları" 
                    rows={4}
                    className="w-full p-3 border border-nature-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent resize-none"
                  />
                  <Button type="submit" className="w-full bg-nature-600 hover:bg-nature-700 text-white py-3">
                    Teklif Gönder
                  </Button>

                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nature-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-nature-400" />
                <span className="text-xl font-bold">YeşilRulo</span>
              </div>
              <p className="text-nature-300 mb-4">
                Türkiye'nin önde gelen rulo çim üreticisi. Premium kalite, garantili hizmet.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ürünler</h4>
              <ul className="space-y-2 text-nature-300">
                <li>Premium Bermuda</li>
                <li>Klasik Karışım</li>
                <li>Spor Sahası</li>
                <li>Özel Karışımlar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hizmetler</h4>
              <ul className="space-y-2 text-nature-300">
                <li>Ücretsiz Keşif</li>
                <li>Hızlı Teslimat</li>
                <li>Profesyonel Döşeme</li>
                <li>Bakım Desteği</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-nature-300">
                <li>+90 (212) 555-0123</li>
                <li>info@yesilrulo.com</li>
                <li>İstanbul, Türkiye</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-nature-800 mt-8 pt-8 text-center text-nature-400">
            <p>&copy; 2024 YeşilRulo. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
