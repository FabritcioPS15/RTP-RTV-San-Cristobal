import React, { useMemo } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface WheelSegment {
    month: string;
    digit: string;
    isCurrent?: boolean;
}

const segments: WheelSegment[] = [
    { month: 'ENE - FEB', digit: '0' },
    { month: 'MAR', digit: '1' },
    { month: 'ABR', digit: '2' },
    { month: 'MAY', digit: '3' },
    { month: 'JUN', digit: '4' },
    { month: 'JUL - AGO', digit: '5' },
    { month: 'SEP', digit: '6' },
    { month: 'OCT', digit: '7' },
    { month: 'NOV', digit: '8' },
    { month: 'DIC', digit: '9' },
];

const InspectionWheel: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
    
    // Mapping 12 months to 10 segments
    const currentMonthIndex = useMemo(() => {
        const month = new Date().getMonth();
        if (month <= 1) return 0; // Ene-Feb
        if (month <= 5) return month - 1; // Mar-Jun
        if (month <= 7) return 5; // Jul-Ago
        return month - 2; // Sep-Dic
    }, []);

    const renderSegments = useMemo(() => {
        const radius = 180;
        const centerX = 200;
        const centerY = 200;
        const segmentAngle = 360 / segments.length;

        return segments.map((seg, i) => {
            const startAngle = i * segmentAngle - 90;
            const endAngle = (i + 1) * segmentAngle - 90;

            const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

            const largeArcFlag = segmentAngle > 180 ? 1 : 0;
            const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

            const textAngle = startAngle + segmentAngle / 2;
            const textRadiusMonth = radius * 0.82;
            const textRadiusDigit = radius * 0.6;

            const txMonth = centerX + textRadiusMonth * Math.cos((textAngle * Math.PI) / 180);
            const tyMonth = centerY + textRadiusMonth * Math.sin((textAngle * Math.PI) / 180);

            const txDigit = centerX + textRadiusDigit * Math.cos((textAngle * Math.PI) / 180);
            const tyDigit = centerY + textRadiusDigit * Math.sin((textAngle * Math.PI) / 180);

            const isCurrentMonth = i === currentMonthIndex;

            const isHovered = i === hoveredIndex;

            return (
                <g 
                    key={i} 
                    className="group/segment cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <path
                        d={pathData}
                        className={`transition-all duration-500 ${isCurrentMonth
                                ? 'fill-orange-500 stroke-white stroke-2 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                                : 'fill-white stroke-gray-100 hover:fill-orange-50 group-hover/segment:stroke-orange-200'
                            }`}
                    />
                    <text
                        x={txMonth}
                        y={tyMonth}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textAngle + 90}, ${txMonth}, ${tyMonth})`}
                        className={`text-[10px] font-black tracking-tighter ${isCurrentMonth ? 'fill-white' : 'fill-gray-400 group-hover/segment:fill-orange-500'
                            }`}
                    >
                        {seg.month}
                    </text>
                    <text
                        x={txDigit}
                        y={tyDigit}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={`text-2xl font-black ${isCurrentMonth ? 'fill-white' : 'fill-gray-900 group-hover/segment:fill-orange-600'
                            }`}
                    >
                        {seg.digit}
                    </text>

                </g>
            );
        });
    }, [currentMonthIndex]);

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
                        <RevealOnScroll>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-16 bg-orange-500 rounded-full" />
                                    <h2 className="text-4xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                                        Rueda de <br />
                                        <span className="text-orange-500">Inspecciones</span>
                                    </h2>
                                </div>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Programa tu Inspección Técnica Vehicular de acuerdo al último dígito de tu placa.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Identifica el mes según tu dígito",
                                        "Agenda tu cita con anticipación",
                                        "Evita multas y recargos"
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                            {text}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-8 border-t border-gray-100">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Requisitos:</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                            <CheckCircle2 size={14} className="text-orange-500" />
                                            Tarjeta Propiedad
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                            <CheckCircle2 size={14} className="text-orange-500" />
                                            DNI / RUC
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                            <CheckCircle2 size={14} className="text-orange-500" />
                                            SOAT Vigente
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Middle Wheel */}
                    <div className="lg:col-span-8 relative flex items-center justify-center order-1 lg:order-2">
                        <RevealOnScroll className="relative w-full aspect-square max-w-[650px]">
                            {/* Background decoration elements */}
                            <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-3xl scale-110 animate-pulse" />

                            {/* The Wheel */}
                            <svg
                                viewBox="0 0 400 400"
                                className="w-full h-full drop-shadow-2xl relative z-10"
                            >
                                <defs>
                                    <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#f97316" />
                                        <stop offset="100%" stopColor="#ea580c" />
                                    </radialGradient>
                                </defs>

                                {/* Outer Ring */}
                                <circle cx="200" cy="200" r="198" fill="none" stroke="#f1f5f9" strokeWidth="4" />

                                {renderSegments}

                                {/* Central Button Area */}
                                <g className="cursor-pointer group/center">
                                    <circle
                                        cx="200"
                                        cy="200"
                                        r="85"
                                        fill="white"
                                        className="shadow-xl"
                                    />
                                    
                                    {hoveredIndex !== null ? (
                                        <g className="animate-entry-fade">
                                            <circle 
                                                cx="200" 
                                                cy="200" 
                                                r="75" 
                                                className="fill-orange-500/10"
                                            />
                                            <text x="200" y="180" textAnchor="middle" className="fill-orange-600 text-[10px] font-black uppercase tracking-widest">
                                                MES: {segments[hoveredIndex].month}
                                            </text>
                                            <text x="200" y="205" textAnchor="middle" className="fill-gray-900 text-3xl font-black">
                                                PLACA {segments[hoveredIndex].digit}
                                            </text>
                                            <text x="200" y="225" textAnchor="middle" className="fill-gray-500 text-[8px] font-bold uppercase tracking-tight">
                                                ÚLTIMO DÍGITO
                                            </text>
                                        </g>
                                    ) : (
                                        <>
                                            <circle
                                                cx="200"
                                                cy="200"
                                                r="75"
                                                fill="url(#centerGradient)"
                                                className="group-hover/center:scale-105 transition-transform duration-300"
                                            />
                                            <text
                                                x="200"
                                                y="190"
                                                textAnchor="middle"
                                                className="fill-white text-[10px] font-black uppercase tracking-widest"
                                            >
                                                Verifica
                                            </text>
                                            <text
                                                x="200"
                                                y="215"
                                                textAnchor="middle"
                                                className="fill-white text-xl font-black uppercase tracking-tighter"
                                            >
                                                TU PLACA
                                            </text>
                                            <path
                                                d="M 190 230 L 210 230"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                className="opacity-50"
                                            />
                                        </>
                                    )}
                                </g>
                            </svg>

                            {/* Circuit decoration lines (Simulated with absolute divs for "style") */}
                            <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-orange-100 rounded-tr-[40px] -z-0" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-orange-100 rounded-bl-[40px] -z-0" />
                        </RevealOnScroll>
                    </div>

                    {/* Right Info Box */}
                    <div className="lg:col-span-2 order-3">
                        <RevealOnScroll className="h-full">
                            <div className="bg-white/40 backdrop-blur-xl border-2 border-orange-500/20 p-8 rounded-[40px] shadow-2xl h-full flex flex-col justify-center relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all" />

                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="text-orange-500" size={24} />
                                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Nota Importante</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                            El incumplimiento de la inspección en el mes asignado conlleva <span className="text-orange-600 font-bold">multas significativas</span> y recargos adicionales.
                                        </p>
                                        <p className="text-sm text-gray-500 italic">
                                            ¡Planifica a tiempo para evitar sanciones!
                                        </p>
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                                                Las citas están sujetas a disponibilidad según la sede elegida.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default InspectionWheel;
