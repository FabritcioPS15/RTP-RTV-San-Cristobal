import { Star, ExternalLink, Quote } from 'lucide-react';
import { Branch } from '../../backend/data/branches';

// Datos de ejemplo de reseñas (en producción, estos vendrían de la Google Places API)
const sampleReviews = [
    {
        author: 'Carlos Mendoza',
        rating: 5,
        text: 'Excelente servicio, muy rápidos y profesionales. La revisión técnica la hicieron en 25 minutos exactos.',
        time: 'hace 2 semanas'
    },
    {
        author: 'María Rodríguez',
        rating: 5,
        text: 'Muy buena atención, el personal es muy amable y explicativo. Recomendado totalmente.',
        time: 'hace 1 mes'
    },
    {
        author: 'Juan Pérez',
        rating: 4,
        text: 'Buen servicio en general, solo tuve que esperar un poco más de lo esperado pero valió la pena.',
        time: 'hace 3 semanas'
    }
];

interface GoogleReviewsProps {
    branch: Branch;
}

export default function GoogleReviews({ branch }: GoogleReviewsProps) {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
            />
        ));
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            {/* Header con calificación */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Reseñas de Google</h3>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {renderStars(branch.rating || 4.5)}
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                            {branch.rating || 4.5}
                        </span>
                        <span className="text-gray-500">
                            ({branch.reviewCount || 150} reseñas)
                        </span>
                    </div>
                </div>
                <a
                    href={branch.googleMapsUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium border border-orange-200"
                >
                    <span>Ver en Google</span>
                    <ExternalLink size={14} />
                </a>
            </div>

            {/* Lista de reseñas */}
            <div className="space-y-4">
                {sampleReviews.map((review, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                                    <div className="flex items-center gap-1">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-gray-400">{review.time}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed pl-13 relative">
                            <Quote size={16} className="absolute -left-1 top-0 text-orange-200" />
                            <span className="ml-5">{review.text}</span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Nota sobre API */}
            <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-xs text-orange-700">
                    <span className="font-semibold">Nota:</span> Estas son reseñas de ejemplo. 
                    Para obtener reseñas reales de Google Maps, necesitas configurar la Google Places API 
                    con tu API Key y agregar los placeIds correctos en branches.ts.
                </p>
            </div>

            {/* Botón para ver más */}
            <div className="mt-4 text-center">
                <a
                    href={branch.googleMapsUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
                >
                    Leer todas las {branch.reviewCount || 150} reseñas en Google Maps
                    <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
}
