import { useState, useEffect } from 'react';
import { ShieldCheck, X, FileText, CheckCircle2 } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('cookieConsent', 'true');
            setIsVisible(false);
            setLoading(false);
        }, 800);
    };

    const [loading, setLoading] = useState(false);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[110] animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl p-6 md:p-8 relative overflow-hidden group">
                {/* Background Accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors duration-500"></div>

                <div className="relative flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-orange-500/10 rounded-2xl">
                                <ShieldCheck className="text-orange-600 w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Política de Privacidad y Cookies</h3>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                        En <span className="font-semibold text-gray-900">Grupo San Cristóbal</span>, utilizamos cookies propias y de terceros para mejorar su experiencia de navegación, analizando sus hábitos y optimizando nuestros servicios de revisión técnica.
                    </p>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-[13px] text-gray-500">
                            <CheckCircle2 size={14} className="text-green-500" />
                            <span>Mejora de la seguridad vial y navegación</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-gray-500">
                            <CheckCircle2 size={14} className="text-green-500" />
                            <span>Contenido personalizado y análisis de planta</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <button
                            onClick={handleAccept}
                            disabled={loading}
                            className={`flex-1 relative overflow-hidden bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-black/10 hover:shadow-black/20 ${loading ? 'opacity-90' : ''}`}
                        >
                            <span className={loading ? 'opacity-0' : 'opacity-100 transition-opacity'}>
                                Aceptar y Continuar
                            </span>
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                        <button
                            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
                        >
                            <FileText size={16} />
                            Ver Derechos
                        </button>
                    </div>

                    <p className="text-[11px] text-gray-400 text-center italic">
                        Al continuar, usted acepta el tratamiento de sus datos conforme a la Ley N° 29733.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
