import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, AttributionControl } from 'react-leaflet';
import { SiGooglemaps, SiWaze } from 'react-icons/si';
import { FaMapMarkerAlt, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import rtvLogo from '../../resources/logos/RTV LOGO CIRCULAR.png';
import rtpLogo from '../../resources/logos/RTP LOGO CIRCULAR.png';
import { branches, Branch } from '../../backend/data/branches';

// Iconos personalizados: pin con área circular para logo / marca

// Pin para sedes RTV
const RtvPinIcon = L.divIcon({
    className: 'custom-logo-pin-icon',
    html: `
      <div class="map-pin-wrapper" style="transform: scale(1.2); transform-origin: top center;">
        <div class="map-pin-body map-pin-body-branch">
          <div class="map-pin-logo">
            <img src="${rtvLogo}" alt="RTV Logo" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        </div>
      </div>
    `,
    iconSize: [60, 80],
    iconAnchor: [30, 80]
});

// Pin para sedes RTP
const RtpPinIcon = L.divIcon({
    className: 'custom-logo-pin-icon',
    html: `
      <div class="map-pin-wrapper" style="transform: scale(1.2); transform-origin: top center;">
        <div class="map-pin-body map-pin-body-branch">
          <div class="map-pin-logo">
            <img src="${rtpLogo}" alt="RTP Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
          </div>
        </div>
      </div>
    `,
    iconSize: [60, 80],
    iconAnchor: [30, 80]
});

// Pin para la ubicación del usuario (Personita Premium)
const UserPinIcon = L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div class="user-marker-container">
        <div class="user-marker-pulse"></div>
        <div class="user-marker-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="white"/>
            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="white"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

// Calcula la distancia entre dos puntos (lat, lng) usando la fórmula de Haversine
function getDistanceKm(a: [number, number], b: [number, number]): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radio de la Tierra en km
    const dLat = toRad(b[0] - a[0]);
    const dLng = toRad(b[1] - a[1]);
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);

    const sinDLat = Math.sin(dLat / 2);
    const sinDLng = Math.sin(dLng / 2);

    const c =
        sinDLat * sinDLat +
        Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;

    const d = 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
    return R * d;
}

function MapController({ center, zoom, isSidebarOpen }: { center: [number, number], zoom: number, isSidebarOpen?: boolean }) {
    const map = useMap();

    // Update view when center/zoom changes
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);

    // Invalidate size when sidebar toggles to ensure map fills space and centers correctly
    useEffect(() => {
        // Immediate invalidation
        map.invalidateSize();

        // Repeated invalidation during transition (for 300ms)
        const start = Date.now();
        const duration = 350; // slightly longer than CSS transition

        const animate = () => {
            const now = Date.now();
            if (now - start < duration) {
                map.invalidateSize();
                requestAnimationFrame(animate);
            } else {
                map.invalidateSize(); // Final check
            }
        };

        requestAnimationFrame(animate);
    }, [isSidebarOpen, map]);

    return null;
}

interface FitBoundsProps {
    bounds: [number, number][] | null;
}

function FitBounds({ bounds }: FitBoundsProps) {
    const map = useMap();

    useEffect(() => {
        if (!bounds || bounds.length < 2) return;
        // Adjust padding based on screen width
        const padding: [number, number] = window.innerWidth < 768 ? [20, 20] : [50, 50];
        map.fitBounds(bounds as any, { padding });
    }, [bounds, map]);

    return null;
}

export default function SedesMap({ selectedBranchId }: { selectedBranchId?: number }) {
    const [filter, setFilter] = useState<'lima' | 'provincia'>('lima');
    const [mapState, setMapState] = useState<{ center: [number, number], zoom: number }>({
        center: [-12.046374, -77.042793],
        zoom: 12
    });

    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [nearestBranches, setNearestBranches] = useState<{ branch: Branch; distance: number; duration?: number }[]>([]);
    const [geoError, setGeoError] = useState<string | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const [fitBounds, setFitBounds] = useState<[number, number][] | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const isBranchDetailView = !!selectedBranchId;

    // Función para obtener datos de ruta de OSRM
    const fetchRouteData = async (start: [number, number], end: [number, number]) => {
        try {
            // OSRM espera longitud,latitud
            const startStr = `${start[1]},${start[0]}`;
            const endStr = `${end[1]},${end[0]}`;
            const url = `https://router.project-osrm.org/route/v1/driving/${startStr};${endStr}?overview=false`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
                return {
                    distance: data.routes[0].distance / 1000, // metros a km
                    duration: data.routes[0].duration / 60 // segundos a minutos
                };
            }
            return null;
        } catch (error) {
            console.error("Error fetching route:", error);
            return null;
        }
    };

    // Si hay una sede seleccionada, inicializar el mapa centrado en ella
    useEffect(() => {
        if (selectedBranchId) {
            const branch = branches.find((b: Branch) => b.id === selectedBranchId);
            if (branch) {
                setMapState({ center: branch.position, zoom: 15 });
                setFilter(branch.region);
            }
        }
    }, [selectedBranchId]);

    // Efecto para actualizar las sedes cercanas cuando cambia el filtro o la ubicación del usuario
    useEffect(() => {
        const updateBranches = async () => {
            if (userLocation) {
                // Filtrar sedes según el filtro actual
                const currentBranches = selectedBranchId
                    ? branches.filter((b: Branch) => b.id === selectedBranchId)
                    : branches.filter((b: Branch) => b.region === filter);

                // Calcular distancias y tiempos de ruta
                const branchesWithDistances = await Promise.all(
                    currentBranches.map(async (branch: Branch) => {
                        const distance = getDistanceKm(userLocation, branch.position);

                        // Obtener datos de ruta si hay una sede seleccionada
                        let routeData = null;
                        if (selectedBranchId) {
                            routeData = await fetchRouteData(userLocation, branch.position);
                        }

                        return {
                            branch,
                            distance,
                            duration: routeData?.duration
                        };
                    })
                );

                // Ordenar por distancia
                const sortedBranches = branchesWithDistances.sort((a, b) => a.distance - b.distance);

                // Tomar las 3 más cercanas o solo la seleccionada
                const result = selectedBranchId ? sortedBranches : sortedBranches.slice(0, 3);
                setNearestBranches(result);
            }
        };

        updateBranches();
    }, [filter, userLocation, selectedBranchId]);

    const handleFilterChange = (newFilter: 'lima' | 'provincia') => {
        if (selectedBranchId) return; // Deshabilitar filtro si hay sede seleccionada
        setFilter(newFilter);
        setFitBounds(null);
        if (newFilter === 'lima') {
            setMapState({ center: [-12.046374, -77.042793], zoom: 12 });
        } else {
            setMapState({ center: [-12.046374, -75.042793], zoom: 6 }); // Zoom out to see más de Perú
        }
    };

    const filteredBranches: Branch[] = selectedBranchId
        ? branches.filter((b: Branch) => b.id === selectedBranchId)
        : branches.filter((b: Branch) => b.region === filter);

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            setGeoError('La geolocalización no es soportada en este navegador.');
            return;
        }

        setIsLocating(true);
        setGeoError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords: [number, number] = [
                    position.coords.latitude,
                    position.coords.longitude
                ];
                setUserLocation(coords);

                // Auto-filtrado: Detectar si el usuario está en Lima o Provincia
                // Un rango aproximado para Lima Metropolitana
                const isNearLima = (
                    coords[0] > -12.5 && coords[0] < -11.5 && 
                    coords[1] > -77.5 && coords[1] < -76.5
                );

                if (!selectedBranchId) {
                    const newFilter = isNearLima ? 'lima' : 'provincia';
                    setFilter(newFilter);
                    setMapState({ center: coords, zoom: 13 });
                } else {
                    const branch = branches.find((b: Branch) => b.id === selectedBranchId);
                    if (branch) {
                        setFitBounds([coords, branch.position]);
                    }
                }

                setIsLocating(false);
            },
            (error) => {
                // Solo mostrar error si fue provocado por el usuario, no en el auto-load
                console.warn("Geolocation auto-load failed:", error.message);
                setGeoError('No se pudo obtener tu ubicación. Verifica los permisos del navegador.');
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 5000 }
        );
    };

    // Trigger automatic location detection on mount
    useEffect(() => {
        // We try to locate automatically if the permission was previously granted
        // or just trigger the prompt immediately for a better UX as requested
        handleUseMyLocation();
    }, []);

    // Formatear duración
    const formatDuration = (minutes: number) => {
        const roundedMins = Math.round(minutes);
        if (roundedMins < 60) {
            return `${roundedMins} min`;
        } else {
            const hours = Math.floor(roundedMins / 60);
            const mins = roundedMins % 60;
            return `${hours} h ${mins} min`;
        }
    };

    return (
        <div className={`w-full ${isBranchDetailView ? 'h-[70vh] md:h-[522px]' : 'h-[500px] md:h-[500px]'} border-2 border-black rounded-xl overflow-hidden shadow-xl bg-white flex flex-col md:flex-row`}>
            {/* Contenedor del mapa */}
            <div className="relative flex-1 h-full">
                {/* Botón para colapsar sidebar (Desktop) */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="hidden md:flex absolute top-1/2 right-0 z-[2000] -translate-y-1/2 translate-x-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-md items-center justify-center hover:bg-gray-50 transition-transform hover:scale-110"
                    aria-label={isSidebarOpen ? "Cerrar panel" : "Abrir panel"}
                >
                    {isSidebarOpen ? <FaChevronRight className="text-gray-600" /> : <FaChevronLeft className="text-gray-600" />}
                </button>

                {/* Filtro Lima / Provincias (esquina superior derecha) - Solo si no hay sede seleccionada */}
                {!selectedBranchId && (
                    <div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded shadow-md border border-black">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => {
                                    // Recentra el mapa según el filtro actual
                                    setFitBounds(null);
                                    if (filter === 'lima') {
                                        setMapState({ center: [-12.046374, -77.042793], zoom: 12 });
                                    } else {
                                        setMapState({ center: [-12.046374, -75.042793], zoom: 6 });
                                    }
                                }}
                                className="px-2 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 transition-colors flex items-center justify-center"
                                aria-label="Recentrar mapa"
                                title="Recentrar mapa"
                            >
                                <FaMapMarkerAlt />
                            </button>
                            <button
                                onClick={() => handleFilterChange('lima')}
                                className={`px-4 py-2 rounded ${filter === 'lima' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-black'}`}
                            >
                                Solo Lima
                            </button>
                            <button
                                onClick={() => handleFilterChange('provincia')}
                                className={`px-4 py-2 rounded ${filter === 'provincia' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-black'}`}
                            >
                                Provincias
                            </button>
                        </div>
                    </div>
                )}

                <MapContainer
                    center={mapState.center}
                    zoom={mapState.zoom}
                    scrollWheelZoom={false}
                    zoomControl={true}
                    attributionControl={false}
                    className="w-full h-full"
                >
                    <AttributionControl position="bottomright" prefix={false} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapController center={mapState.center} zoom={mapState.zoom} isSidebarOpen={isSidebarOpen} />
                    <FitBounds bounds={fitBounds} />
                    {filteredBranches.map(branch => (
                        <Marker
                            key={branch.id}
                            position={branch.position}
                            icon={branch.type === 'RTP' ? RtpPinIcon : RtvPinIcon}
                        >
                            <Popup offset={[-6, -50]} className="custom-popup">
                                <div className="space-y-0.5 text-[10px] leading-tight min-w-[120px]">
                                    <p className="text-[8px] uppercase tracking-wide text-gray-500 mb-0.5 font-bold">
                                        {branch.type}
                                    </p>
                                    <p className="font-bold text-gray-900 text-[11px] leading-tight">
                                        {branch.name}
                                    </p>
                                    <p className="text-gray-600 leading-tight text-[9px]">
                                        {branch.address}
                                    </p>
                                    <p className="text-[8px] text-gray-400 mt-0.5 italic">
                                        Ubicación aproximada
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    {userLocation && (
                        <>
                            <Circle
                                center={userLocation}
                                radius={nearestBranches.length > 0 ? Math.max(nearestBranches[0].distance * 1000 * 1.1, 1500) : 2500}
                                // Radio dinámico: siempre cubre al menos la sede más cercana, con un pequeño margen
                                pathOptions={{ color: '#ea580c', fillColor: '#ea580c', fillOpacity: 0.12 }}
                            />
                            <Marker position={userLocation} icon={UserPinIcon}>
                                <Popup
                                    offset={[8, -30]}
                                    className="z-[1000]"
                                    closeButton={false}
                                >
                                    <div className="font-bold text-sm">Estás aquí</div>
                                </Popup>
                            </Marker>
                        </>
                    )}
                </MapContainer>
            </div>

            <aside className={`
                ${isSidebarOpen ? 'w-full md:w-1/3 md:basis-1/3' : 'md:w-0 md:basis-0 md:p-0 md:border-l-0'}
                border-t md:border-t-0 md:border-l border-black bg-white 
                flex flex-col text-sm 
                overflow-hidden
                h-40 md:h-full
                transition-all duration-300 ease-in-out
            `}>
                <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 pt-3 pb-2 shadow-sm">
                    <h3 className="text-base font-semibold">
                        {selectedBranchId ? 'Información de ruta' : 'Ubicación y sedes cercanas'}
                    </h3>
                    <div className="flex items-center gap-2">
                        {/* Texto eliminado */}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 pt-2">
                    <button
                        onClick={handleUseMyLocation}
                        className="px-3 py-1.5 rounded border border-black bg-black text-white hover:bg-gray-900 transition-colors text-[10px] font-medium w-fit mb-2"
                        disabled={isLocating}
                    >
                        {isLocating ? 'Detectando ubicación…' : 'Usar mi ubicación'}
                    </button>

                    {geoError && (
                        <p className="text-xs text-red-600 mt-1">
                            {geoError}
                        </p>
                    )}

                    {userLocation ? (
                        <div className="mt-1 space-y-2">
                            {/* Tu ubicación */}
                            <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-all hover:shadow-md">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                                        <FaMapMarkerAlt className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-gray-900 text-[10px] truncate">Tu ubicación</h4>
                                            <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[9px] font-medium text-orange-700 flex-shrink-0">
                                                Actual
                                            </span>
                                        </div>
                                        <div className="mt-0.5 flex gap-2 text-[9px] font-medium text-gray-500 truncate">
                                            <span>Lat: {userLocation[0].toFixed(4)}</span>
                                            <span>Lng: {userLocation[1].toFixed(4)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sedes más cercanas (Top 3) */}
                            {nearestBranches.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                                        {selectedBranchId ? 'Destino' : `${nearestBranches.length} Sedes más cercanas`}
                                    </p>
                                    {nearestBranches.map((item, index) => (
                                        <div key={item.branch.id} className="group relative overflow-hidden rounded-xl border-2 border-orange-500 bg-white p-2 shadow-md transition-all hover:shadow-lg">
                                            {index === 0 && (
                                                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-orange-50 opacity-50 transition-transform group-hover:scale-110"></div>
                                            )}

                                            <div className="relative flex items-start gap-3">
                                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-orange-100 bg-white shadow-sm">
                                                    <img
                                                        src={item.branch.type === 'RTP' ? rtpLogo : rtvLogo}
                                                        alt={`Logo ${item.branch.type}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-bold text-gray-900 text-xs">{item.branch.name}</h4>
                                                        <span className="whitespace-nowrap rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700">
                                                            {item.distance < 1
                                                                ? `${Math.round(item.distance * 1000)} m`
                                                                : `${item.distance.toFixed(1)} km`
                                                            }
                                                        </span>
                                                    </div>

                                                    <p className="mt-1 text-[10px] text-gray-600 leading-relaxed">
                                                        {item.branch.address}
                                                    </p>

                                                    {/* Estimated Time Display */}
                                                    <div className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-gray-700">
                                                        <span className="text-orange-600">⏱️ Tiempo aprox:</span>
                                                        <span>
                                                            {item.duration
                                                                ? formatDuration(item.duration)
                                                                : 'Calculando...'}
                                                        </span>
                                                    </div>

                                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                                        <button
                                                            onClick={() => {
                                                                if (item.branch.googleMapsUrl) {
                                                                    window.open(item.branch.googleMapsUrl, '_blank', 'noopener,noreferrer');
                                                                } else {
                                                                    const [lat, lng] = item.branch.position;
                                                                    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                                                                    window.open(url, '_blank', 'noopener,noreferrer');
                                                                }
                                                            }}
                                                            className="inline-flex items-center justify-center gap-1 rounded-lg bg-gray-100 px-2 py-1.5 text-[10px] font-semibold text-gray-700 transition-colors hover:bg-gray-200 hover:text-black"
                                                        >
                                                            <SiGooglemaps className="text-sm text-gray-600" />
                                                            Google Maps
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                if (item.branch.wazeUrl) {
                                                                    window.open(item.branch.wazeUrl, '_blank', 'noopener,noreferrer');
                                                                } else {
                                                                    const [lat, lng] = item.branch.position;
                                                                    const url = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
                                                                    window.open(url, '_blank', 'noopener,noreferrer');
                                                                }
                                                            }}
                                                            className="inline-flex items-center justify-center gap-1 rounded-lg bg-gray-100 px-2 py-1.5 text-[10px] font-semibold text-gray-700 transition-colors hover:bg-gray-200 hover:text-black"
                                                        >
                                                            <SiWaze className="text-sm text-[#33ccff]" />
                                                            Waze
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="mt-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
                            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                <FaMapMarkerAlt className="h-4 w-4" />
                            </div>
                            <p className="text-[10px] text-gray-500">
                                {selectedBranchId
                                    ? "Activa tu ubicación para ver la distancia y tiempo estimado de llegada."
                                    : "Activa tu ubicación para ver las sedes más cercanas a ti."
                                }
                            </p>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}