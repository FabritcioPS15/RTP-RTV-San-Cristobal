export interface Branch {
    id: number;
    name: string;
    position: [number, number];
    address: string;
    region: 'lima' | 'provincia';
    type: 'RTP' | 'RTV';
    googleMapsUrl?: string;
    wazeUrl?: string;
    placeId?: string; // Google Places ID para obtener reseñas
    phone?: string;
    schedule?: string;
    image?: string;
    rating?: number; // Calificación promedio
    reviewCount?: number; // Cantidad de reseñas
    pricing: {
        vehicleType: string;
        usage: string;
        price: number;
    }[];
}

export const branches: Branch[] = [
    // Lima Branches
    {
        id: 1,
        name: 'Sede RTP Callao',
        position: [-11.984339249713159, -77.12509328775818],
        address: 'Av. Nestor Gambeta cdra 1,2 y 3, Callao',
        region: 'lima',
        type: 'RTP',
        googleMapsUrl: 'https://maps.app.goo.gl/2khduJ8CDpCo8Bbr8',
        wazeUrl: 'https://waze.com/ul?ll=-11.984339249713159,-77.12509328775818&navigate=yes',
        placeId: 'ChIJN8tD5K5bZFIRRMjJ3jwLmAA', // Ejemplo - reemplazar con placeId real
        phone: '(01) 123-4567',
        schedule: 'Lun - Sab: 7:00 - 20:00',
        rating: 4.7,
        reviewCount: 234,
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        pricing: [
            { vehicleType: 'liviano', usage: 'auto particular', price: 55 },
            { vehicleType: 'liviano', usage: 'taxi', price: 75 },
            { vehicleType: 'liviano', usage: 'carga', price: 80 },
            { vehicleType: 'pesado', usage: 'particular', price: 100 },
            { vehicleType: 'pesado', usage: 'carga', price: 120 },
            { vehicleType: 'pesado', usage: 'pasajeros', price: 130 },
            { vehicleType: 'pesado', usage: 'escolar', price: 140 },
        ]
    },
    {
        id: 2,
        name: 'Sede RTP Canta Callao',
        position: [-11.96993651592964, -77.08508058845739],
        address: 'Av. Canta Callao 164, Los Olivos 15113',
        region: 'lima',
        type: 'RTV',
        googleMapsUrl: 'https://maps.app.goo.gl/7F72yS6adsvrjVoa7',
        wazeUrl: 'https://waze.com/ul?ll=-11.96993651592964,-77.08508058845739&navigate=yes',
        placeId: 'ChIJ4Y6uZj5bZFIRRMjJ3jwLmAA', // Ejemplo - reemplazar con placeId real
        phone: '(01) 987-6543',
        schedule: 'Lun - Sab: 7:00 - 20:00',
        rating: 4.5,
        reviewCount: 187,
        image: 'https://images.unsplash.com/photo-1632733711679-5292d6863f12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        pricing: [
            { vehicleType: 'liviano', usage: 'particular', price: 70 }, // Slightly different price
            { vehicleType: 'liviano', usage: 'taxi', price: 80 },
            { vehicleType: 'moto', usage: 'particular', price: 45 },
            { vehicleType: 'moto', usage: 'taxi', price: 55 },
            // Does not support heavy vehicles
        ]
    },

    // Provincia Branches
    {
        id: 3,
        name: 'Sede RTP ICA',
        position: [-16.409047, -71.537451],
        address: 'Calle Mercaderes 101, Arequipa',
        region: 'provincia',
        type: 'RTP',
        phone: '(054) 123-456',
        schedule: 'Lun - Sab: 8:00 - 18:00',
        pricing: [
            { vehicleType: 'liviano', usage: 'particular', price: 60 },
            { vehicleType: 'liviano', usage: 'taxi', price: 70 },
            { vehicleType: 'pesado', usage: 'particular', price: 90 },
            { vehicleType: 'pesado', usage: 'carga', price: 110 },
        ]
    },
    {
        id: 4,
        name: 'Sede RTP Ayacucho',
        position: [-13.531950, -71.967463],
        address: 'Av. El Sol 202, Cusco',
        region: 'provincia',
        type: 'RTP',
        phone: '(084) 123-456',
        schedule: 'Lun - Sab: 8:00 - 17:00',
        pricing: [
            { vehicleType: 'liviano', usage: 'particular', price: 60 },
            { vehicleType: 'pesado', usage: 'carga', price: 115 },
        ]
    },
    {
        id: 5,
        name: 'Sede RTV Ayacucho',
        position: [-8.115990, -79.029980],
        address: 'Jr. Pizarro 303, Trujillo',
        region: 'provincia',
        type: 'RTV',
        phone: '(044) 123-456',
        schedule: 'Lun - Sab: 8:00 - 18:00',
        pricing: [
            { vehicleType: 'moto', usage: 'particular', price: 40 },
            { vehicleType: 'menor', usage: 'particular', price: 35 },
        ]
    },
    {
        id: 6,
        name: 'Sede RTV Andahuaylas',
        position: [-8.115990, -79.029980],
        address: 'Jr. Pizarro 303, Trujillo',
        region: 'provincia',
        type: 'RTV',
        phone: '(044) 123-456',
        schedule: 'Lun - Sab: 8:00 - 18:00',
        pricing: [
            { vehicleType: 'moto', usage: 'particular', price: 40 },
            { vehicleType: 'menor', usage: 'particular', price: 35 },
        ]
    },
    {
        id: 7,
        name: 'Sede RTP Huancavelica',
        position: [-8.115990, -79.029980],
        address: 'Jr. Pizarro 303, Trujillo',
        region: 'provincia',
        type: 'RTP',
        phone: '(044) 123-456',
        schedule: 'Lun - Sab: 8:00 - 18:00',
        pricing: [
            { vehicleType: 'liviano', usage: 'particular', price: 60 },
            { vehicleType: 'pesado', usage: 'carga', price: 110 },
        ]
    }
];
