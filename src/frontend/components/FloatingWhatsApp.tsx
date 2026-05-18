import { useState, useRef, useEffect, FC } from 'react';
import { X, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { branches } from '../../backend/data/branches';

interface Sede {
  id: string;
  name: string;
  phone: string;
  address: string;
}

const FloatingWhatsApp: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sedes: Sede[] = branches
    .filter(branch => !!branch.phone)
    .map(branch => ({
      id: branch.id.toString(),
      name: branch.name,
      phone: branch.phone || '',
      address: branch.address,
    }));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleWhatsAppClick = (phone: string): void => {
    const formattedPhone = phone.replace(/[^\d+]/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 border border-gray-200">
          <div className="bg-green-600 p-3 text-white flex justify-between items-center">
            <div className="flex items-center">
              <FaWhatsapp className="mr-2" size={20} />
              <span className="font-semibold">Elige una sede</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {sedes.map((sede: Sede) => (
              <button
                key={sede.id}
                onClick={() => handleWhatsAppClick(sede.phone)}
                className="w-full text-left p-2 hover:bg-green-100 transition-colors flex items-center border-b border-green-300 last:border-0"
              >
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <MapPin className="text-green-600" size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{sede.name}</p>
                  <div className="flex items-center mt-0">
                    <Phone className="text-gray-500 mr-1" size={14} />
                    <span className="text-sm text-gray-600">{sede.phone}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate">{sede.address}</p>
                </div>
                <FaWhatsapp className="text-green-500 ml-2" size={20} />
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105 ${isOpen ? 'rotate-180' : ''
          }`}
        aria-label="Abrir chat de WhatsApp"
      >
        {isOpen ? <X size={24} /> : <FaWhatsapp size={24} />}
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
