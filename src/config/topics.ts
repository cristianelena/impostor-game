export interface Topic {
    id: string;
    name: string;
    description: string;
    locations: string[];
    emoji: string;
}

export const TOPICS: Topic[] = [
    {
        id: "general",
        name: "General",
        description: "Lugares comunes y cotidianos",
        emoji: "🌍",
        locations: [
            "Estación Espacial", "Submarino", "Set de Película", "Barco Pirata",
            "Circo", "Hospital", "Universidad", "Fiesta en la Playa", "Casino", "Tren",
            "Supermercado", "Banco", "Restaurante", "Escuela", "Zoologico"
        ]
    },
    {
        id: "food",
        name: "Comida",
        description: "Platos y comidas del mundo",
        emoji: "🍔",
        locations: [
            "Pizzería", "Sushi Bar", "Taquería", "Panadería", "Heladería",
            "Barbacoa", "Cafetería", "Candy Shop", "Buffet", "Food Truck"
        ]
    },
    {
        id: "animals",
        name: "Animales",
        description: "Habitats y reinos animales",
        emoji: "🦁",
        locations: [
            "Selva", "Océano", "Granja", "Desierto", "Polo Norte",
            "Sabana Africana", "Acuario", "Nido de Pájaros", "Colmena", "Cueva de Osos"
        ]
    },
    {
        id: "fantasy",
        name: "Fantasía",
        description: "Lugares mágicos e irreales",
        emoji: "✨",
        locations: [
            "Castillo de Hogwarts", "Mordor", "Narnia", "País de las Maravillas",
            "Atlantis", "Olimpo", "Valhalla", "Fabrica de Chocolate", "Casa de Papel", "Death Star"
        ]
    },
    {
        id: "love",
        name: "Amor",
        description: "Lugares románticos",
        emoji: "❤️",
        locations: [
            "Parque de atracciones", "Café"
        ]
    }
];
