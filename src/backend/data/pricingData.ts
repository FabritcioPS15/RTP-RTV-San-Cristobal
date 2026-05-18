export interface PricingOption {
    id: string;
    vehicleType: string;
    vehicleTypeLabel: string;
    usage: string;
    usageLabel: string;
    price: number;
    features: string[];
    notes?: string;
    imageUrl?: string;
}

export const vehicleTypes = [
    { value: 'liviano', label: 'Vehículo Liviano' },
    { value: 'pesado', label: 'Vehículo Pesado' },
    { value: 'moto', label: 'Motocicleta' },
    { value: 'menor', label: 'Vehículo Menor' },
];

export const usageTypes = [
    { value: 'particular', label: 'Particular' },
    { value: 'taxi', label: 'Taxi/Remisse' },
    { value: 'carga', label: 'Carga' },
    { value: 'pasajeros', label: 'Transporte de Pasajeros' },
    { value: 'escolar', label: 'Transporte Escolar' },
];

export const pricingData: PricingOption[] = [
    // VEHÍCULO LIVIANO
    {
        id: 'liviano-particular',
        vehicleType: 'liviano',
        vehicleTypeLabel: 'Vehículo Liviano',
        usage: 'auto particular',
        usageLabel: 'Auto Particular',
        price: 65,
        features: [
            'Inspección completa de sistemas',
            'Certificado digital MTC',
            'Revisión de luces y señales',
            'Control de emisiones',
        ],
    },
    {
        id: 'liviano-taxi',
        vehicleType: 'liviano',
        vehicleTypeLabel: 'Vehículo Liviano',
        usage: 'taxi',
        usageLabel: 'Taxi/Remisse',
        price: 75,
        features: [
            'Inspección completa de sistemas',
            'Certificado digital MTC',
            'Revisión de luces y señales',
            'Control de emisiones',
            'Verificación de taxímetro',
            'Revisión de seguros obligatorios',
        ],
    },
    {
        id: 'liviano-carga',
        vehicleType: 'liviano',
        vehicleTypeLabel: 'Vehículo Liviano',
        usage: 'carga',
        usageLabel: 'Carga',
        price: 80,
        features: [
            'Inspección completa de sistemas',
            'Certificado digital MTC',
            'Revisión de suspensión reforzada',
            'Control de emisiones',
            'Verificación de capacidad de carga',
        ],
    },

    // VEHÍCULO PESADO
    {
        id: 'pesado-particular',
        vehicleType: 'pesado',
        vehicleTypeLabel: 'Vehículo Pesado',
        usage: 'particular',
        usageLabel: 'Particular',
        price: 100,
        features: [
            'Inspección especializada',
            'Certificado digital MTC',
            'Revisión de frenos neumáticos/hidráulicos',
            'Control de emisiones',
            'Verificación de sistema eléctrico',
        ],
    },
    {
        id: 'pesado-carga',
        vehicleType: 'pesado',
        vehicleTypeLabel: 'Vehículo Pesado',
        usage: 'carga',
        usageLabel: 'Carga',
        price: 120,
        features: [
            'Inspección especializada completa',
            'Certificado digital MTC',
            'Revisión de frenos neumáticos/hidráulicos',
            'Control de emisiones',
            'Verificación de sistema de suspensión',
            'Revisión de capacidad de carga',
            'Inspección de quinta rueda (si aplica)',
        ],
    },
    {
        id: 'pesado-pasajeros',
        vehicleType: 'pesado',
        vehicleTypeLabel: 'Vehículo Pesado',
        usage: 'pasajeros',
        usageLabel: 'Transporte de Pasajeros',
        price: 130,
        features: [
            'Inspección especializada completa',
            'Certificado digital MTC',
            'Revisión de frenos neumáticos/hidráulicos',
            'Certificado de Revisión Técnica Vehicular anterior',
            'Control de emisiones',
            'Verificación de salidas de emergencia',
            'Revisión de cinturones de seguridad',
            'Inspección de sistema de ventilación',
        ],
    },
    {
        id: 'pesado-escolar',
        vehicleType: 'pesado',
        vehicleTypeLabel: 'Vehículo Pesado',
        usage: 'escolar',
        usageLabel: 'Transporte Escolar',
        price: 140,
        features: [
            'Inspección especializada completa',
            'Certificado digital MTC',
            'Revisión de frenos neumáticos/hidráulicos',
            'Control de emisiones',
            'Verificación de señalización escolar',
            'Revisión de cinturones de seguridad',
            'Inspección de salidas de emergencia',
            'Verificación de botiquín y extintor',
        ],
    },

    // MOTOCICLETA
    {
        id: 'moto-particular',
        vehicleType: 'moto',
        vehicleTypeLabel: 'Motocicleta',
        usage: 'particular',
        usageLabel: 'Particular',
        price: 45,
        features: [
            'Inspección rápida de sistemas',
            'Revisión de luces y señales del vehículo',
            'Certificado digital MTC',
            'Control de emision de gases',
            'Verificación de frenos',
        ],
    },
    {
        id: 'moto-taxi',
        vehicleType: 'moto',
        vehicleTypeLabel: 'Motocicleta',
        usage: 'taxi',
        usageLabel: 'Taxi/Mototaxi',
        price: 55,
        features: [
            'Inspección completa de sistemas',
            'Certificado digital MTC',
            'Revisión de luces y señales',
            'Control de emisiones',
            'Verificación de frenos',
            'Revisión de estructura de pasajeros',
            'Verificación de seguros obligatorios',
        ],
    },
    {
        id: 'moto-carga',
        vehicleType: 'moto',
        vehicleTypeLabel: 'Motocicleta',
        usage: 'carga',
        usageLabel: 'Carga',
        price: 50,
        features: [
            'Inspección de sistemas',
            'Certificado digital MTC',
            'Revisión de luces y señales',
            'Control de emisiones',
            'Verificación de frenos',
            'Revisión de capacidad de carga',
        ],
    },

    // VEHÍCULO MENOR
    {
        id: 'menor-particular',
        vehicleType: 'menor',
        vehicleTypeLabel: 'Vehículo Menor',
        usage: 'particular',
        usageLabel: 'Particular',
        price: 40,
        features: [
            'Inspección básica',
            'Certificado digital MTC',
            'Revisión de luces',
            'Verificación de frenos',
        ],
    },
    {
        id: 'menor-carga',
        vehicleType: 'menor',
        vehicleTypeLabel: 'Vehículo Menor',
        usage: 'carga',
        usageLabel: 'Carga',
        price: 50,
        features: [
            'Inspección básica',
            'Certificado digital MTC',
            'Revisión de luces',
            'Verificación de frenos',
            'Revisión de capacidad de carga',
        ],
    },
];

// Helper function to get pricing by vehicle type and usage
export function getPricing(vehicleType: string, usage: string): PricingOption | undefined {
    return pricingData.find(
        (option) => option.vehicleType === vehicleType && option.usage === usage
    );
}

// Helper function to get all available usage types for a vehicle type
export function getAvailableUsageTypes(vehicleType: string): typeof usageTypes {
    const availableUsages = pricingData
        .filter((option) => option.vehicleType === vehicleType)
        .map((option) => option.usage);

    return usageTypes.filter((type) => availableUsages.includes(type.value));
}
