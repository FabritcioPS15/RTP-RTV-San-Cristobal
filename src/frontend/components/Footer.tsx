import { Facebook, Instagram, Twitter, Phone, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingWhatsApp from './FloatingWhatsApp';
import PremiumButton from './PremiumButton';
import RevealOnScroll from './RevealOnScroll';
import { useMemo } from 'react';

export default function Footer() {
  const quickLinks = useMemo(() => [
    { path: '/', label: 'Inicio' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/sedes', label: 'Nuestras Sedes' },
    { path: '/requisitos', label: 'Requisitos MTC' },
    { path: '/contacto', label: 'Contacto' },
  ], []);

  const socialLinks = useMemo(() => [
    { name: 'Facebook', icon: <Facebook size={20} />, url: 'https://facebook.com' },
    { name: 'Instagram', icon: <Instagram size={18} />, url: 'https://instagram.com' },
    { name: 'Twitter', icon: <Twitter size={18} />, url: 'https://twitter.com' },
  ], []);

  return (
    <footer className="bg-black text-white pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Main Grid Content */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16">

            {/* Col 1: Company Info */}
            <div className="space-y-6">
              <div className="flex flex-col">
                <img
                  src="/LogoRTPSanCristobal_horizontal.png"
                  alt="Grupo San Cristóbal Logo"
                  className="h-18 w-auto object-contain brightness-0 invert mb-2 self-start"
                />
                <span className="text-[10px] tracking-[0.2em] text-gray-500 font-bold uppercase">Inspecciones Técnicas Vehiculares</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Líderes en revisiones técnicas vehiculares en el Perú. Certificamos tu vehículo con la más alta tecnología y estándares de calidad del MTC.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {socialLinks.map((s, i) => (
                  <PremiumButton 
                    key={i} 
                    href={s.url} 
                    className="w-10 h-10 !rounded-full !px-0 !py-0 bg-white/5 border-white/10 hover:bg-orange-500 hover:border-orange-500"
                  >
                    {s.icon}
                  </PremiumButton>
                ))}
              </div>
            </div>

            {/* Col 2: Contacts */}
            <div className="space-y-6">
              <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-6">Contáctanos</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </div>
                  <span className="text-gray-400 font-medium group-hover:text-white transition-colors">+51 987 654 321</span>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <span className="text-gray-400 font-medium group-hover:text-white transition-colors">contacto@sancristobal.pe</span>
                </div>
              </div>
            </div>

            {/* Col 3: Quick Links / Products */}
            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-6">Explorar</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <li key={i} className="flex items-center gap-2 group cursor-pointer">
                    <ChevronRight size={14} className="text-orange-500 transform group-hover:translate-x-1 transition-transform" />
                    <Link to={link.path} className="text-gray-400 group-hover:text-white transition-colors text-sm font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Map Widget */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border-4 border-white/5 shadow-2xl h-48 md:h-full lg:h-48 group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15606.353386348148!2d-77.0365256!3d-12.0621065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAzJzQzLjYiUyA3N8KwMDInMTEuNSJX!5e0!3m2!1ses!2spe!4v1709500000000!5m2!1ses!2spe"
                  className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Mapa de Ubicación</span>
                <Link to="/sedes" className="text-[10px] text-orange-500 font-bold uppercase tracking-widest hover:underline">Ver todas las sedes</Link>
              </div>
            </div>

          </div>
        </RevealOnScroll>

        {/* Footer Bottom Bar */}
        <RevealOnScroll>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">
              Copyright © {new Date().getFullYear()} Grupo San Cristóbal. Todos los derechos Reservados
            </p>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
              Desarrollado con excelencia técnica
            </p>
          </div>
        </RevealOnScroll>
      </div>
      <FloatingWhatsApp />
    </footer>
  );
}
