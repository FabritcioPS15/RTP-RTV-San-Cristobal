import { useState, useEffect, useRef, useMemo } from 'react';
import { X, ChevronDown, MapPin, Home, Users, FileText, Phone, Calendar, Ticket } from 'lucide-react';
import PremiumButton from './PremiumButton';
import { Link, useLocation } from 'react-router-dom';
import { branches } from '../../backend/data/branches';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sedesDropdownOpen, setSedesDropdownOpen] = useState(false);
    const [mobileSedesOpen, setMobileSedesOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Detect if we're on home page (Now a constant)

    // Scroll effect for header with glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Desktop dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setSedesDropdownOpen(false);
            }

            // Mobile menu
            if (mobileMenuOpen && mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node) &&
                !(event.target as HTMLElement).closest('button[aria-label="Toggle menu"]')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileMenuOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setSedesDropdownOpen(false);
        setMobileSedesOpen(false);
    }, [location.pathname]);

    // Disable body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const navLinks = useMemo(() => [
        { path: '/', label: 'Inicio', icon: <Home size={22} /> },
        { path: '/nosotros', label: 'Nosotros', icon: <Users size={22} /> },
        { path: '/cronograma', label: 'Cronograma', icon: <Calendar size={22} /> },
        { path: '/requisitos', label: 'Requisitos', icon: <FileText size={22} /> },
    ], []);

    const limaBranches = useMemo(() => branches.filter(branch => branch.region === 'lima'), [branches]);
    const provinciaBranches = useMemo(() => branches.filter(branch => branch.region === 'provincia'), [branches]);

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const isSedesActive = location.pathname.startsWith('/sedes');

    const handleMobileSedesClick = () => {
        setMobileSedesOpen(!mobileSedesOpen);
    };

    // WhatsApp se maneja por sede en el menú móvil mediante branchesWithPhone

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''}`}>
            {/* Header Principal - MÁS ALTO Y COMPACTO */}
            <nav
                className={`transition-all duration-300 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-200'
                    : 'bg-white border-b border-gray-100'
                    } ${isScrolled ? 'h-[75px]' : 'h-[90px]'}`}
            >
                <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between xl:justify-center items-center h-full">
                        {/* Logo - Imagen horizontal oficial */}
                        <div className="flex-shrink-0 xl:absolute xl:left-8 animate-entry-slide-down">
                            <Link
                                to="/"
                                className="group block"
                            >
                                <img
                                    src="/LogoRTPSanCristobal_horizontal.png"
                                    alt="Grupo San Cristóbal Logo"
                                    className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation - SIMPLIFICADO */}
                        <div className="hidden xl:flex items-center h-full space-x-0">
                            {navLinks.slice(0, 2).map((link, index) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative group flex items-center h-full px-3 transition-colors duration-300 animate-entry-slide-down ${isActive(link.path)
                                        ? 'text-orange-500'
                                        : 'text-gray-900 hover:text-orange-500'
                                        } ${index === 0 ? 'animate-stagger-1' : 'animate-stagger-2'}`}
                                >
                                    <span className="font-medium text-lg relative py-0.5">
                                        {link.label}
                                        <span className={`absolute -bottom-1 left-0 h-[2px] bg-orange-500 transition-all duration-300 ease-out ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                    </span>
                                </Link>
                            ))}

                            {/* Sedes Dropdown - Mega menú desktop */}
                            <div className="relative h-full flex items-center animate-entry-slide-down animate-stagger-3" ref={dropdownRef}>
                                <button
                                    onClick={() => setSedesDropdownOpen(!sedesDropdownOpen)}
                                    className={`relative group flex items-center h-full px-3 transition-colors duration-300 ${isSedesActive
                                        ? 'text-orange-500'
                                        : 'text-gray-900 hover:text-orange-500'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 relative py-0.5">
                                        <span className="font-medium text-lg text-inherit">Sedes</span>
                                        <ChevronDown
                                            size={18}
                                            className={`transition-transform duration-300 ${sedesDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                        <span className={`absolute -bottom-1 left-0 h-[2px] bg-orange-500 transition-all duration-300 ease-out ${isSedesActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                    </div>
                                </button>

                                {/* Dropdown Menu - Mega menú */}
                                <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[760px] rounded-xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-200 ${sedesDropdownOpen
                                    ? 'opacity-100 scale-100 translate-y-0'
                                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                    }`}>
                                    <div className="bg-black/95 backdrop-blur-2xl">
                                        <div className="grid grid-cols-3 gap-0 divide-x divide-white/5">
                                            {/* Columna Lima */}
                                            <div className="p-5">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-3">Sedes en Lima</p>
                                                <ul className="space-y-1 text-sm">
                                                    {limaBranches.map(branch => (
                                                        <li key={branch.id}>
                                                            <Link
                                                                to={`/sedes/${branch.id}`}
                                                                onClick={() => setSedesDropdownOpen(false)}
                                                                className="flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                                            >
                                                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
                                                                <div>
                                                                    <p className="text-gray-100 text-sm font-medium">{branch.name}</p>
                                                                    <p className="text-xs text-gray-400 line-clamp-2">{branch.address}</p>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Columna Provincia */}
                                            <div className="p-5">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-3">Sedes en Provincia</p>
                                                <ul className="space-y-1 text-sm">
                                                    {provinciaBranches.map(branch => (
                                                        <li key={branch.id}>
                                                            <Link
                                                                to={`/sedes/${branch.id}`}
                                                                onClick={() => setSedesDropdownOpen(false)}
                                                                className="flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                                            >
                                                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
                                                                <div>
                                                                    <p className="text-gray-100 text-sm font-medium">{branch.name}</p>
                                                                    <p className="text-xs text-gray-400 line-clamp-2">{branch.address}</p>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Columna call-to-action */}
                                            <div className="p-5 bg-gradient-to-br from-orange-600/20 via-orange-500/10 to-transparent">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-2">Explora todas las sedes</p>
                                                <p className="text-sm text-gray-200 mb-4">Consulta el mapa completo y encuentra la sede más cercana para tu revisión técnica.</p>
                                                <Link
                                                    to="/sedes"
                                                    onClick={() => setSedesDropdownOpen(false)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/20"
                                                >
                                                    <MapPin size={16} />
                                                    <span>Ver todas las sedes</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Resto de enlaces - SIMPLIFICADO */}
                            {navLinks.slice(2).map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative group flex items-center h-full px-3 transition-colors duration-300 ${isActive(link.path)
                                        ? 'text-orange-500'
                                        : 'text-gray-900 hover:text-orange-500'
                                        }`}
                                >
                                    <span className="font-medium text-lg relative py-0.5">
                                        {link.label}
                                        <span className={`absolute -bottom-1 left-0 h-[2px] bg-orange-500 transition-all duration-300 ease-out ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Contact & Coupon Buttons */}
                        <div className="hidden xl:flex items-center gap-4 absolute right-8 animate-entry-fade animate-stagger-4">
                            {/* Coupon Button */}
                            <Link
                                to="/cupon"
                                className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                                title="Obtener cupón de descuento"
                            >
                                <Ticket size={24} className="text-white transition-transform group-hover:rotate-12" />
                                {/* Tooltip or badge */}
                                <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] font-black px-2 py-1 rounded-full animate-pulse border border-white/20">
                                    -S/10
                                </span>
                            </Link>

                            <PremiumButton to="/contacto" className="gap-2">
                                <Phone size={20} />
                                <span>Contáctanos</span>
                            </PremiumButton>
                        </div>

                        {/* Tablet & Mobile Menu Button (visible hasta xl) */}
                        <div className="xl:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={`group relative p-3 rounded-2xl transition-all duration-300 ${mobileMenuOpen ? 'bg-[#f97316] shadow-orange-500/40' : 'bg-black hover:bg-black/90'} shadow-lg border border-white/10`}
                                aria-label="Toggle menu"
                            >
                                <div className="relative w-6 h-5 flex flex-col justify-between">
                                    <span className={`h-0.5 w-full bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                                    <span className={`h-0.5 w-full bg-white rounded-full transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                                    <span className={`h-0.5 w-full bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - MEJORADO PARA TABLETS */}
            <div
                ref={mobileMenuRef}
                className={`xl:hidden fixed inset-0 z-40 ${mobileMenuOpen
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible pointer-events-none'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Menu Panel - ESTÉTICA PREMIUM OSCURA */}
                <div className={`absolute right-0 top-0 h-full w-full bg-black/95 backdrop-blur-3xl border-l border-white/5 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    {/* Elementos decorativos de fondo */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                        <div className="absolute top-0 right-0 w-[70%] h-full bg-[#f97316]/5 transform skew-x-[-15deg] translate-x-32" />
                        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#f97316]/10 to-transparent" />
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                        {/* Header del menú móvil con Logo */}
                        <div className="p-8 border-b border-white/5">
                            <div className="flex justify-between items-center">
                                <Link
                                    to="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block"
                                >
                                    <img
                                        src="/LogoRTPSanCristobal_horizontal.png"
                                        alt="Grupo San Cristóbal Logo"
                                        className="h-10 w-auto object-contain brightness-0 invert"
                                    />
                                </Link>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                                >
                                    <X size={24} className="text-[#f97316]" />
                                </button>
                            </div>
                        </div>

                        {/* Contenido del menú con scroll */}
                        <div className="flex-1 overflow-y-auto px-8 py-10">
                            <div className="space-y-3">
                                {/* Links principales con diseño de tarjeta */}
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-5 px-6 py-5 rounded-2xl transition-all duration-300 border ${isActive(link.path)
                                            ? 'bg-[#f97316]/10 border-[#f97316]/30 text-white'
                                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <div className={`${isActive(link.path) ? 'text-[#f97316]' : 'text-gray-500'}`}>
                                            {link.icon}
                                        </div>
                                        <span className="font-bold text-xl uppercase tracking-tight">{link.label}</span>
                                    </Link>
                                ))}

                                {/* Sedes Mobile - Acordeón Premium */}
                                <div className="mt-6">
                                    <button
                                        onClick={handleMobileSedesClick}
                                        className={`flex items-center justify-between w-full px-6 py-5 rounded-2xl transition-all duration-300 border ${isSedesActive
                                            ? 'bg-[#f97316]/10 border-[#f97316]/30 text-white'
                                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <MapPin size={22} className={isSedesActive ? 'text-[#f97316]' : 'text-gray-500'} />
                                            <span className="font-bold text-xl uppercase tracking-tight">Sedes</span>
                                        </div>
                                        <ChevronDown
                                            size={20}
                                            className={`transition-transform duration-300 ${mobileSedesOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Sedes Submenu */}
                                    <div className={`overflow-hidden transition-all duration-500 ${mobileSedesOpen ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                                        }`}>
                                        <div className="grid grid-cols-1 gap-3 pl-4 border-l-2 border-[#f97316]/30">
                                            <Link
                                                to="/sedes"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 text-white font-medium border border-white/5"
                                            >
                                                <MapPin size={18} className="text-[#f97316]" />
                                                <span>Todas las sedes</span>
                                            </Link>

                                            {branches.map((branch) => (
                                                <Link
                                                    key={branch.id}
                                                    to={`/sedes/${branch.id}`}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="flex items-center justify-between px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors border border-white/5"
                                                >
                                                    <span className="font-medium">{branch.name}</span>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Promo & Contact Mobile */}
                                <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
                                    <Link
                                        to="/cupon"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full flex items-center justify-between gap-5 px-8 py-6 rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                                <Ticket size={24} />
                                            </div>
                                            <div className="text-left">
                                                <span className="block font-black text-xl uppercase tracking-tight">Obtener Cupón</span>
                                                <span className="block text-[10px] text-white/70 font-bold uppercase tracking-widest mt-0.5">Descuento de S/ 10</span>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                                            <ChevronDown size={18} className="-rotate-90" />
                                        </div>
                                    </Link>

                                    <PremiumButton
                                        to="/contacto"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full !py-7 !rounded-3xl shadow-2xl gap-3 text-xl"
                                    >
                                        <Phone size={24} />
                                        <span>Contáctanos</span>
                                    </PremiumButton>
                                </div>

                                {/* Info general */}
                                <div className="mt-10 p-6 rounded-3xl bg-white/5 border border-white/10 text-xs text-gray-400 space-y-3">
                                    <p className="font-black text-sm text-white uppercase tracking-wider">Atención al Cliente</p>
                                    <div className="flex justify-between items-center">
                                        <span>Horario:</span>
                                        <span className="font-bold text-[#f97316]">Lun - Sáb: 7am - 6pm</span>
                                    </div>
                                    <p className="leading-relaxed opacity-60">Recuerda traer tu tarjeta de propiedad y SOAT vigente para tu revisión técnica.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
}
