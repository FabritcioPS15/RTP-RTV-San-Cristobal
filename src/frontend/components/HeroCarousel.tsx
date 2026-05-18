import { useState, useEffect } from 'react';
import PremiumButton from './PremiumButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Revisión Técnica Vehicular",
      subtitle: "RTV y RTP en todo el Perú",
      description: "Certificados oficiales del MTC con tecnología de punta y personal especializado para tu seguridad.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      ctaText: "Ver Sedes",
      ctaLink: "/sedes"
    },
    {
      id: 2,
      title: "Inspección Técnica Vehicular",
      subtitle: "Cumple con la normativa",
      description: "Realizamos inspecciones técnicas completas para vehículos particulares y de transporte en todo el país.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      ctaText: "Más Información",
      ctaLink: "/contacto"
    },
    {
      id: 3,
      title: "Certificado de Revisión",
      subtitle: "Rápido y confiable",
      description: "Obtén tu certificado de revisión técnica en minutos. Sedes en Lima y principales ciudades del Perú.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      ctaText: "Agendar Ahora",
      ctaLink: "/sedes"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden pt-0">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60" />

            {/* Content Aligned Left */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-4xl flex items-center gap-8 group">
                  <div className="w-1.5 h-48 bg-orange-500 rounded-full shrink-0 animate-grow-vertical" />
                  <div className="space-y-6">
                    <h1 className="banner-title text-white animate-grow-text">
                      {slide.title}
                    </h1>
                    <p className="banner-description text-gray-300 max-w-2xl">
                      {slide.description}
                    </p>
                    <div className="pt-6">
                      <PremiumButton to={slide.ctaLink} className="px-10 py-5 text-lg shadow-orange-500/40">
                        {slide.ctaText}
                      </PremiumButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Decorative Detail */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-500/0 to-transparent opacity-50" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {/* Minimalist Navigation (Bottom Left) */}
      <div className="absolute bottom-10 left-10 z-30 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white border border-white/10 transition-all duration-300 backdrop-blur-sm group"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white border border-white/10 transition-all duration-300 backdrop-blur-sm group"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Progress Dots integrated */}
        <div className="flex gap-1.5 ml-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 rounded-full transition-all duration-500 ${index === currentSlide
                ? 'bg-orange-500 w-8'
                : 'bg-white/20 w-4 hover:bg-white/40'
                }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default HeroCarousel;
