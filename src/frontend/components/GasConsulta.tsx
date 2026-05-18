import { useState } from 'react';
import { Fuel, AlertCircle, CheckCircle2, ExternalLink, Shield } from 'lucide-react';

export default function GasConsulta() {
    const [codigo, setCodigo] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleConsulta = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!codigo || codigo.length < 8) {
            setError('Ingresa un código de certificación válido (mínimo 8 caracteres)');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        // Simulación de consulta
        setTimeout(() => {
            setLoading(false);
            // Datos de ejemplo
            setResult({
                codigo: codigo.toUpperCase(),
                tipoGas: 'GNV',
                fechaEmision: '10/02/2025',
                fechaVencimiento: '10/02/2026',
                resultado: 'APROBADO',
                sede: 'Sede RTP Callao',
                tecnico: 'TEC. Carlos Rodríguez',
                observaciones: 'Sistema de gas en óptimas condiciones. Sin fugas detectadas.',
                cilindro: {
                    marca: 'Tomasetto',
                    capacidad: '60L',
                    fechaFabricacion: '2020',
                    estado: 'APROBADO'
                },
                itemsVerificados: [
                    { item: 'Cilindro', estado: 'APROBADO' },
                    { item: 'Válvula', estado: 'APROBADO' },
                    { item: 'Regulador', estado: 'APROBADO' },
                    { item: 'Tubería', estado: 'APROBADO' },
                    { item: 'Conexiones', estado: 'APROBADO' },
                    { item: 'Fugas', estado: 'APROBADO' }
                ]
            });
        }, 1500);
    };

    return (
        <div className="space-y-6">
            {/* Información */}
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-2xl p-6 border border-cyan-200">
                <div className="flex items-start gap-4">
                    <div className="bg-cyan-500 p-3 rounded-xl text-white">
                        <Fuel size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Consulta de Certificación Gas (GNV/GLP)</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Consulta la certificación de tu sistema de gas vehicular (GNV o GLP) verificando el estado del cilindro y componentes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Formulario de consulta */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">Ingresa el Código de Certificación</h3>
                </div>
                <form onSubmit={handleConsulta} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Código de Certificación
                            </label>
                            <input
                                type="text"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                                placeholder="Ej: GAS-2025-12345"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-lg font-mono uppercase"
                                maxLength={15}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                El código se encuentra en tu certificado de gas
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Consultando...</span>
                                </>
                            ) : (
                                <>
                                    <Fuel size={20} />
                                    <span>Consultar Gas</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Resultado de la consulta */}
            {result && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-cyan-50 to-cyan-100">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="text-cyan-600" size={24} />
                            <h3 className="text-xl font-bold text-gray-900">Resultado de Certificación Gas</h3>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Código</p>
                                    <p className="text-lg font-bold text-gray-900 font-mono">{result.codigo}</p>
                                </div>
                                <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                                    <p className="text-xs text-cyan-600 uppercase tracking-wider mb-1">Tipo de Gas</p>
                                    <p className="text-2xl font-bold text-cyan-600">{result.tipoGas}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Fecha de Emisión</p>
                                    <p className="text-lg font-semibold text-gray-900">{result.fechaEmision}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Vencimiento</p>
                                    <p className="text-lg font-semibold text-gray-900">{result.fechaVencimiento}</p>
                                </div>
                                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                    <p className="text-xs text-green-600 uppercase tracking-wider mb-1">Resultado</p>
                                    <p className="text-2xl font-bold text-green-600">{result.resultado}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sede</p>
                                    <p className="text-lg font-semibold text-gray-900">{result.sede}</p>
                                </div>
                            </div>
                        </div>

                        {/* Información del cilindro */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Shield className="text-blue-600" size={20} />
                                <h4 className="text-sm font-bold text-gray-900">Información del Cilindro</h4>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Marca</p>
                                    <p className="text-sm font-semibold text-gray-900">{result.cilindro.marca}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Capacidad</p>
                                    <p className="text-sm font-semibold text-gray-900">{result.cilindro.capacidad}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Fabricación</p>
                                    <p className="text-sm font-semibold text-gray-900">{result.cilindro.fechaFabricacion}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Estado</p>
                                    <p className="text-sm font-semibold text-green-600">{result.cilindro.estado}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
                            <p className="text-xs text-blue-600 uppercase tracking-wider mb-2">Observaciones</p>
                            <p className="text-gray-700 text-sm leading-relaxed">{result.observaciones}</p>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-gray-900 mb-3">Ítems Verificados</h4>
                            <div className="space-y-2">
                                {result.itemsVerificados.map((item: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-gray-50 rounded-xl p-3 border border-gray-200"
                                    >
                                        <span className="text-sm font-medium text-gray-700">{item.item}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            item.estado === 'APROBADO'
                                                ? 'bg-green-100 text-green-700'
                                                : item.estado === 'OBSERVADO'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {item.estado}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <a
                                href="https://www.gob.pe/mtc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
                            >
                                Ver más detalles en el portal del MTC
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Nota */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-start gap-4">
                    <AlertCircle className="text-gray-400 flex-shrink-0 mt-1" size={20} />
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-sm">Nota Importante</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Esta es una consulta de demostración. Para obtener información oficial y actualizada, 
                            utiliza el portal del MTC o acércate a nuestras sedes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
