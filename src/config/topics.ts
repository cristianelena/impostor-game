export interface Topic {
    id: string;
    name: string;
    description: string;
    locations: string[];
    emoji: string;
    impostorHint: string;
}

export const TOPICS: Topic[] = [
    {
        id: "fantasy",
        name: "Fantasía",
        description: "Lugares mágicos e irreales",
        emoji: "✨",
        impostorHint: "Lugar inexistente o mágico",
        locations: [
            "Atlantis", "Camelot", "Castillo de Drácula", "Castillo de Hogwarts", "Ciudad Gótica",
            "El País de las Maravillas", "El País de Nunca Jamás", "El Olimpo", "Estrella de la Muerte",
            "Fábrica de Chocolate", "Fortaleza de la Soledad", "Fondo de Bikini", "Hobbiton",
            "Isla de la Calavera", "Jardín del Edén", "La Comarca", "Laboratorio de Dexter",
            "Madriguera de Conejo", "Mansión de los Avengers", "Metrópolis", "Minas de Moria",
            "Montaña de la Perdición", "Mordor", "Narnia", "Nave Espacial", "Palacio de Jabba",
            "Pandora", "Parque Jurásico", "Pueblo Paleta", "Reino Champiñón", "Rivendel",
            "Taller de Santa", "Springfield", "Tardis", "Tierra Media", "Torre de los Vengadores",
            "Valhalla", "Wakanda", "Westeros", "Winterfell"
        ]
    },
    {
        id: "general",
        name: "General",
        description: "Lugares comunes y cotidianos",
        emoji: "🌍",
        impostorHint: "Sitio público o común",
        locations: [
            "Aeropuerto", "Ascensor", "Autolavado", "Banco", "Biblioteca", "Bodega", "Cafetería",
            "Calle", "Campo de Golf", "Cárcel", "Carnaval", "Casa", "Cementerio", "Centro Comercial",
            "Cine", "Circo", "Cocina", "Concierto", "Crucero", "Escuela", "Estación de Bomberos",
            "Estación de Policía", "Estación de Tren", "Estadio", "Farmacia", "Ferretería",
            "Gimnasio", "Hospital", "Hotel", "Iglesia", "Jardín", "Laboratorio", "Lavandería",
            "Librería", "Mercado", "Museo", "Oficina", "Parque", "Playa", "Peluquería", "Piscina",
            "Restaurante", "Sauna", "Spa", "Supermercado", "Teatro", "Tienda", "Universidad",
            "Zoológico", "Discoteca"
        ]
    },
    {
        id: "geography",
        name: "Geografía",
        description: "Lugares del mundo",
        emoji: "🗺️",
        impostorHint: "Ubicación global famosa",
        locations: [
            "Amazonas", "Antártida", "Alpes", "Atacama", "Bali", "Bora Bora", "Cañón del Colorado",
            "Caribe", "Cataratas del Iguazú", "Cataratas del Niágara", "Copacabana",
            "Cordillera de los Andes", "Desierto de Gobi", "Desierto del Sahara", "Everest",
            "Galápagos", "Gran Barrera de Coral", "Groenlandia", "Hawaii", "Himalaya", "Ibiza",
            "Isla de Pascua", "Kilimanjaro", "Las Vegas", "Machu Picchu", "Madagascar", "Maldivas",
            "Mar Muerto", "Monte Fuji", "Muralla China", "Nilo", "Polo Norte", "Polo Sur",
            "Río de Janeiro", "Santorini", "Selva Negra", "Stonehenge", "Tahití", "Tíbet", "Yellowstone"
        ]
    },
    {
        id: "history",
        name: "Historia",
        description: "Lugares y eventos históricos",
        emoji: "📜",
        impostorHint: "Evento o lugar del pasado",
        locations: [
            "1492", "Álamo", "Antigua Grecia", "Antigua Roma", "Bastilla", "Batalla de Waterloo",
            "Berlín 1989", "Caballo de Troya", "Castillo Medieval", "Chichén Itzá", "Coliseo Romano",
            "Cruzadas", "Descubrimiento de América", "Día D", "Edad de Hielo", "Edad de Piedra",
            "Edad Media", "Egipto Antiguo", "El Dorado", "Era Vikinga", "Feria Mundial",
            "Fiebre del Oro", "Guerra Civil", "Guerra Fría", "Guerra de Vietnam", "Guillotina",
            "Imperio Azteca", "Imperio Inca", "Imperio Maya", "Industrialización", "Inquisición",
            "Misión Apollo 11", "Muro de Berlín", "Partenón", "Pearl Harbor", "Pirámides de Giza",
            "Renacimiento", "Revolución Francesa", "Revolución Industrial", "Titanic", "Wild West"
        ]
    },
    {
        id: "institutions",
        name: "Instituciones",
        description: "Organizaciones y edificios oficiales",
        emoji: "🏛️",
        impostorHint: "Edificio oficial o gubernamental",
        locations: [
            "Academia Militar", "Asilo", "Banco Central", "Biblioteca Nacional", "Bolsa de Valores",
            "Bomberos", "Cámara de Comercio", "Capitolio", "Cárcel Federal", "Casa Blanca",
            "Catedral", "Centro de Investigación", "Centro de Rehabilitación", "Clínica", "Comisaría",
            "Congreso", "Consulado", "Corte Suprema", "Cruz Roja", "Estación Espacial", "Embajada",
            "Escuela de Derecho", "Escuela de Medicina", "Facultad", "Fundación", "Hospital General",
            "Juzgado", "Laboratorio Nacional", "Ministerio", "Municipalidad", "Museo Nacional",
            "Observatorio", "ONU", "Orfanato", "Palacio de Gobierno", "Parlamento", "Penitenciaría",
            "Pentágono", "Sede de Gobierno", "Universidad Estatal"
        ]
    },
    {
        id: "professions",
        name: "Profesiones",
        description: "Lugares de trabajo",
        emoji: "💼",
        impostorHint: "Lugar de trabajo u oficio",
        locations: [
            "Agencia de Publicidad", "Aserradero", "Astillero", "Barbería", "Bufete de Abogados",
            "Cantera", "Carpintería", "Central Eléctrica", "Clínica Dental", "Clínica Veterinaria",
            "Cocina de Chef", "Compañía de Seguros", "Consultorio", "Despacho", "Editorial",
            "Estudio de Arquitectura", "Estudio de Arte", "Estudio de Grabación", "Estudio de TV",
            "Fábrica", "Granja Industrial", "Imprenta", "Laboratorio Químico", "Lavandería Industrial",
            "Mina", "Taller de Costura", "Obra de Construcción", "Oficina de Correos",
            "Oficina de Diseño", "Panadería", "Pastelería", "Barco Pesquero", "Plataforma Petrolífera",
            "Quirófano", "Estación de Radio", "Redacción de Periódico", "Sala de Juntas", "Sastrería",
            "Taller Mecánico", "Torre de Control"
        ]
    },
    {
        id: "romance",
        name: "Romance",
        description: "Lugares románticos",
        emoji: "❤️",
        impostorHint: "Relacionado con el amor o citas",
        locations: [
            "Balcón", "Banquete de Boda", "Baño de Espuma", "Cabaña en el Bosque", "Cama",
            "Campo de Flores", "Cena a la Luz de las Velas", "Cine Drive-in", "Cita a Ciegas",
            "Crucero al Atardecer", "Despedida de Soltera", "Día de San Valentín",
            "Escapada de Fin de Semana", "Fuegos Artificiales", "Góndola Veneciana", "Jacuzzi",
            "Jardín de Rosas", "Joyería", "Lago de los Cisnes", "Luna de Miel", "Muelle",
            "Noche de Bodas", "Noria", "Parque al Atardecer", "Paseo en Carruaje", "Picnic",
            "Playa Privada", "Propuesta de Matrimonio", "Puente de los Candados", "Restaurante de Lujo",
            "Rooftop Bar", "Sala de Baile", "San Valentín", "Spa para Parejas", "Suite Nupcial",
            "Terraza", "Tienda de Lenceria", "Tienda de Novias", "Tarde de Lluvia", "Viñedo"
        ]
    },
    {
        id: "zoology",
        name: "Zoología",
        description: "Reino animal y hábitats",
        emoji: "🦁",
        impostorHint: "Hábitat natural o animal",
        locations: [
            "Acuario", "Arrecife de Coral", "Aviario", "Bosque de Bambú", "Bosque Tropical",
            "Cascada", "Charca", "Colmena", "Corral", "Cueva", "Delta", "Desierto", "Establo",
            "Estanque", "Golfo", "Granja", "Hormiguero", "Isla Desierta", "Lago", "Madriguera",
            "Manglar", "Mar Abierto", "Marisma", "Monte", "Nido", "Océano Profundo", "Pantano",
            "Parque Nacional", "Pastizal", "Pecera", "Perrera", "Polo", "Pradera",
            "Refugio de Vida Silvestre", "Reserva Natural", "Río", "Sabana", "Selva", "Tundra",
            "Veterinaria"
        ]
    }
];
