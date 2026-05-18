import { useParams, Navigate } from 'react-router-dom';
import { branches } from '../../backend/data/branches';
import { MapPin, Phone, ArrowRight, Star, Mail } from 'lucide-react';
import PremiumButton from '../components/PremiumButton';
import SimpleBranchMap from '../components/SimpleBranchMap';
import RevealOnScroll from '../components/RevealOnScroll';
import { useEffect } from 'react';

function SedeDetalle() {
    const { id } = useParams<{ id: string }>();
    const branch = branches.find(b => b.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!branch) {
        return <Navigate to="/sedes" replace />;
    }

    const emailContacto = `contacto@gruposancristobal.pe`;

    // Helper to get prices
    const getPriceFor = (type: string, usage: string) => {
        const p = branch.pricing?.find(p => p.vehicleType === type && (usage === 'any' || p.usage.includes(usage)));
        return p?.price;
    };

    const autoPrice = getPriceFor('liviano', 'particular');
    const camionetaPrice = getPriceFor('liviano', 'carga') || getPriceFor('liviano', 'taxi');
    const camionPrice = getPriceFor('pesado', 'carga') || getPriceFor('pesado', 'particular');

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION - ADAPTADO CON ESTÉTICA PREMIUM */}
            <section className="relative h-[40vh] min-h-[350px] w-full bg-black overflow-hidden flex items-center">
                {/* Cuadriláteros de fondo y máscara de imagen adaptativos */}
                <div className="absolute inset-0 z-0">
                    {/* Fondo Gris Claro (Decorativo) */}
                    <div className="absolute top-0 right-0 w-[48%] h-full bg-gray-50 transform skew-x-[-15deg] translate-x-12" />

                    {/* Acento de malla decorativa para móvil */}
                    <div className="md:hidden absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.1),transparent_50%)]" />

                    {/* Cuadrilátero de contorno (Ghost shape) */}
                    <div className="absolute top-0 right-0 w-[48%] h-full border-l-[1px] border-orange-500/30 transform skew-x-[-15deg] translate-x-6 opacity-40" />

                    {/* Acentos decorativos - Responsivos */}
                    <div className="absolute top-0 right-[42%] w-1.5 h-full bg-orange-500/10 transform skew-x-[-15deg]" />
                    <div className="absolute bottom-6 right-[45%] w-32 h-1 bg-orange-500 transform skew-x-[-15deg] shadow-[0_0_20px_rgba(249,115,22,0.6)]" />

                    {/* Contenedor de Imagen: Animación separada del Skew */}
                    <div className="absolute top-0 right-0 w-full md:w-[45%] h-full z-0 animate-entry-slide-left">
                        <div className="absolute inset-0 md:transform md:skew-x-[-15deg] md:translate-x-20 overflow-hidden md:border-l-[8px] md:border-[#f97316] shadow-[-20px_0_50px_rgba(0,0,0,0.4)]">
                            <div className="absolute inset-0 md:transform md:skew-x-[15deg] md:-translate-x-24 scale-150">
                                <img
                                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
                                    className="w-full h-full object-cover opacity-40 md:opacity-90 saturate-[1.2]"
                                    alt="Modern Vehicle"
                                />
                                {/* Capas de color adaptativas */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 md:via-black/60 to-transparent md:to-transparent" />
                                <div className="absolute inset-0 bg-[#f97316]/5 mix-blend-overlay" />
                            </div>
                        </div>
                    </div>

                    {/* Brillo decorativo naranja (Responsivo) */}
                    <div className="absolute top-0 right-0 w-1 md:w-2 h-full bg-[#f97316] transform md:skew-x-[-15deg] md:translate-x-[400px] shadow-[0_0_40px_rgba(249,115,22,0.9)]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    {/* Texto Informativo Adaptado - Muy compacto en móvil */}
                    <div className="flex items-center gap-4 md:gap-8">
                        {/* Barra decorativa vertical naranja (Más pequeña en móvil) */}
                        <div className="w-1.5 h-32 bg-orange-500 rounded-full shrink-0 shadow-[0_0_25px_rgba(249,115,22,0.6)] animate-grow-vertical" />

                        <div className="text-white max-w-2xl">
                            <h1 className="banner-title text-white animate-grow-text">
                                {branch.name.split(' ').map((word, idx, arr) => (
                                    <span key={idx} className={idx === arr.length - 1 ? 'text-[#f97316]' : 'text-white'}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>

                            {/* Botones Interactivos solo para Móvil - Mejorados */}
                            <div className="flex gap-4 mt-6 md:hidden">
                                <button className="px-5 py-2.5 bg-[#f97316] text-white text-[11px] font-black uppercase rounded-xl shadow-[0_10px_20px_rgba(249,115,22,0.3)] active:scale-95 transition-all animate-entry-fade animate-stagger-1">
                                    Reservar Cita
                                </button>
                                <button className="px-5 py-2.5 bg-white/10 text-white text-[11px] font-black uppercase rounded-xl border border-white/20 backdrop-blur-md shadow-lg active:scale-95 transition-all animate-entry-fade animate-stagger-2">
                                    Ver Tarifas
                                </button>
                            </div>

                            <p className="banner-description text-gray-400 max-w-lg mt-8 animate-entry-fade animate-stagger-3">
                                Guía completa y atención especializada para aprobar tu inspección vehicular sin contratiempos.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Decorative Detail */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-500/0 to-transparent opacity-50" />
            </section>

            {/* SERVICIOS SECTION */}
            <section className="py-32 max-w-7xl mx-auto px-4">
                <div className="flex items-start gap-6 mb-20">
                    <div className="w-1.5 h-20 bg-[#f97316] rounded-full shrink-0" />
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight uppercase">
                            Servicios de <span className="text-[#f97316]">Inspección</span>
                        </h2>
                        <p className="content-text text-gray-500 max-w-2xl">
                            Nuestra sede en {branch.name.replace('Sede RTP ', '').replace('Sede RTV ', '')} equipada con tecnología de última generación para procesar todo tipo de certificaciones técnicas vigentes.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Livianos */}
                    {/* Livianos */}
                    <RevealOnScroll className="delay-100">
                        <div className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 hover:shadow-orange-500/10 transition-all duration-500">
                            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Livianos" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute bottom-12 left-10 right-10 text-white">
                                <h3 className="text-2xl font-black mb-3">Vehículos Livianos</h3>
                                <p className="content-text text-gray-300 mb-6">
                                    Autos, camionetas y SUV con tiempo estimado de proceso de menos de 20 minutos.
                                </p>
                                <button className="flex items-center gap-2 font-black text-[11px] uppercase tracking-widest hover:gap-3 transition-all">
                                    Más Información <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Pesados */}
                    <RevealOnScroll className="delay-200">
                        <div className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 hover:shadow-orange-500/10 transition-all duration-500">
                            <img src="https://images.unsplash.com/photo-1586191582151-f70351799633?q=80&w=800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Pesados" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute bottom-12 left-10 right-10 text-white">
                                <h3 className="text-2xl font-black mb-3">Vehículos Pesados</h3>
                                <p className="content-text text-gray-300 mb-6">
                                    Camiones, buses y transporte de carga especializado hasta 12 toneladas.
                                </p>
                                <button className="flex items-center gap-2 font-black text-[11px] uppercase tracking-widest hover:gap-3 transition-all">
                                    Más Información <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Especiales */}
                    <RevealOnScroll className="delay-300">
                        <div className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 hover:shadow-orange-500/10 transition-all duration-500">
                            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Especiales" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute bottom-12 left-10 right-10 text-white">
                                <h3 className="text-2xl font-black mb-3">Certificados Especiales</h3>
                                <p className="content-text text-gray-300 mb-6">
                                    Modificaciones, bonificaciones por neumáticos y certificados de operatividad.
                                </p>
                                <button className="flex items-center gap-2 font-black text-[11px] uppercase tracking-widest hover:gap-3 transition-all">
                                    Más Información <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* TARIFAS SECTION */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-start gap-6 mb-20">
                        <div className="w-1.5 h-20 bg-[#f97316] rounded-full shrink-0" />
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight uppercase">
                                Tarifas y <span className="text-[#f97316]">Costos</span>
                            </h2>
                            <p className="content-text text-gray-500 max-w-2xl">
                                Precios competitivos y transparentes para garantizar la seguridad de su vehículo. Todas las tarifas incluyen impuestos y certificaciones oficiales.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Auto */}
                        <RevealOnScroll className="delay-100">
                            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Automóviles</p>
                                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Automóviles</h3>
                                <p className="content-text text-gray-500 mb-10 min-h-[48px]">
                                    Uso particular, flotas y transporte de personal ligero.
                                </p>
                                <div className="flex items-start gap-1 mb-10">
                                    <span className="text-gray-900 font-black text-xl mt-1">S/</span>
                                    <span className="text-7xl font-black text-gray-900 tracking-tighter group-hover:text-orange-500 transition-colors">{autoPrice || 60}.00</span>
                                </div>
                                <div className="space-y-4 mb-10 flex-grow">
                                    {['Incluye IGV', 'Certificado MTC', 'Sticker Holográfico'].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                                <Star size={10} fill="currentColor" />
                                            </div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <PremiumButton className="w-full bg-[#f97316] text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-500/20 text-sm uppercase tracking-widest">
                                    Confirmar Reserva
                                </PremiumButton>
                            </div>
                        </RevealOnScroll>

                        {/* Camionetas */}
                        <RevealOnScroll className="delay-200">
                            <div className="bg-white rounded-[40px] p-10 border-2 border-orange-500 shadow-2xl shadow-orange-500/10 flex flex-col relative scale-105 z-10 group">
                                <div className="absolute top-6 right-10 bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                                    MÁS SOLICITADO
                                </div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Con & Pesquera</p>
                                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Camionetas</h3>
                                <p className="content-text text-gray-500 mb-10 min-h-[48px]">
                                    Vehículos SUV, pickups y furgones hasta 3.5 toneladas.
                                </p>
                                <div className="flex items-start gap-1 mb-10">
                                    <span className="text-gray-400 font-bold text-sm mt-1 mr-1">Desde</span>
                                    <span className="text-gray-900 font-black text-xl mt-1">S/</span>
                                    <span className="text-7xl font-black text-gray-900 tracking-tighter group-hover:text-orange-500 transition-colors">{camionetaPrice || 70}.00</span>
                                </div>
                                <div className="space-y-4 mb-10 flex-grow">
                                    {['Incluye IGV', 'Certificado MTC', 'Sticker Holográfico'].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                                <Star size={10} fill="currentColor" />
                                            </div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <PremiumButton className="w-full bg-[#f97316] text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-500/20 text-sm uppercase tracking-widest">
                                    Confirmar Reserva
                                </PremiumButton>
                            </div>
                        </RevealOnScroll>

                        {/* Camiones */}
                        <RevealOnScroll className="delay-300">
                            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Pesados</p>
                                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Camiones</h3>
                                <p className="content-text text-gray-500 mb-10 min-h-[48px]">
                                    Vehículos de carga y transporte pesado hasta UTPL.
                                </p>
                                <div className="flex items-start gap-1 mb-10">
                                    <span className="text-gray-400 font-bold text-sm mt-1 mr-1">Desde</span>
                                    <span className="text-gray-900 font-black text-xl mt-1">S/</span>
                                    <span className="text-7xl font-black text-gray-900 tracking-tighter group-hover:text-orange-500 transition-colors">{camionPrice || 110}.00</span>
                                </div>
                                <div className="space-y-4 mb-10 flex-grow">
                                    {['Incluye IGV', 'Certificado MTC', 'Diagnóstico de RTP'].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                                <Star size={10} fill="currentColor" />
                                            </div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <PremiumButton className="w-full bg-[#f97316] text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-500/20 text-sm uppercase tracking-widest">
                                    Confirmar Reserva
                                </PremiumButton>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* INFO GRID SECTION */}
            <section className="py-32 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    {/* Column 1: Info Operativa */}
                    <RevealOnScroll>
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-1 h-8 bg-[#f97316] rounded-full" />
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                                    Información <span className="text-[#f97316]">Operativa</span>
                                </h3>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-base">
                                    <span className="text-gray-500 font-medium">Lunes - Viernes</span>
                                    <span className="text-gray-900 font-black">07:00 - 19:00</span>
                                </div>
                                <div className="flex justify-between items-center text-base">
                                    <span className="text-gray-500 font-medium">Sábados</span>
                                    <span className="text-gray-900 font-black">08:00 - 17:00</span>
                                </div>
                                <div className="flex justify-between items-center text-base">
                                    <span className="text-gray-500 font-medium">Domingos</span>
                                    <span className="text-red-500 font-black uppercase">Cerrado</span>
                                </div>
                            </div>

                            <div className="mt-12 space-y-4">
                                <div className="flex items-center gap-5 bg-gray-50 p-5 rounded-[24px] border border-gray-100 transition-all hover:bg-white hover:shadow-xl group">
                                    <div className="bg-white p-3 rounded-xl text-orange-600 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">TELÉFONO DIRECTO</p>
                                        <p className="font-black text-gray-900">{branch.phone || '(024) 123-456'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 bg-gray-50 p-5 rounded-[24px] border border-gray-100 transition-all hover:bg-white hover:shadow-xl group">
                                    <div className="bg-white p-3 rounded-xl text-orange-600 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">EMAIL CONSULTAS</p>
                                        <p className="font-black text-gray-900 truncate max-w-[200px]">{emailContacto}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Column 2: Ubicación */}
                    <RevealOnScroll className="delay-200">
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-1 h-8 bg-[#f97316] rounded-full" />
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                                    Ubicación y <span className="text-[#f97316]">Contacto</span>
                                </h3>
                            </div>
                            <div className="rounded-[40px] overflow-hidden border border-gray-100 shadow-xl shadow-black/5 h-[220px] mb-8 relative group">
                                <SimpleBranchMap branch={branch} />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all pointer-events-none" />
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600 mt-1">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <p className="font-black text-gray-900 text-lg mb-1">{branch.name}</p>
                                    <p className="content-text text-gray-500 leading-relaxed">{branch.address}</p>
                                    <button className="text-orange-600 font-black text-[11px] uppercase tracking-widest mt-6 flex items-center gap-2 hover:gap-3 transition-all">
                                        Ver en Google Maps <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Column 3: Reseñas */}
                    <RevealOnScroll className="delay-300">
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-1 h-8 bg-[#f97316] rounded-full" />
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                                    Reseñas de <span className="text-[#f97316]">Clientes</span>
                                </h3>
                            </div>
                            <div className="flex items-center gap-4 mb-10 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                <div className="flex text-orange-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill={i < 4 ? "currentColor" : "none"} />)}
                                </div>
                                <span className="text-4xl font-black text-gray-900">4.5</span>
                                <div className="h-8 w-px bg-gray-200 mx-2" />
                                <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">(150 reseñas)</span>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-black text-lg">C</div>
                                            <div>
                                                <p className="font-black text-gray-900">Carlos Mendoza</p>
                                                <div className="flex text-orange-400">
                                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">hace 1 semana</span>
                                    </div>
                                    <p className="content-text text-gray-600 italic">
                                        "Excelente atención muy rápida y profesional. La revisión técnica fue puntual y transparente. El personal es muy amable."
                                    </p>
                                </div>
                                <button className="w-full text-center text-orange-600 font-black text-[11px] uppercase tracking-widest hover:underline pt-4 transition-all">
                                    Leer todas las reseñas &gt;
                                </button>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        </div>
    );
}

export default SedeDetalle;
