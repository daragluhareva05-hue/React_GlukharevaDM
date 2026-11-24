export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    emoji: string;
}

export const products: Product[] = [
    {
        id: 1,
        title: "Наушники",
        category: "Электроника",
        price: 1500,
        emoji: "🎧",
    },
    {
        id: 2,
        title: "Клавиатура",
        category: "Электроника",
        price: 2500,
        emoji: "⌨️",
    },
    {
        id: 3,
        title: "Компьютерная мышь",
        category: "Электроника",
        price: 900,
        emoji: "🖱️",
    },
    {
        id: 4,
        title: "Блокнот",
        category: "Канцелярия",
        price: 350,
        emoji: "📒",
    },
    {
        id: 5,
        title: "Ручка",
        category: "Канцелярия",
        price: 100,
        emoji: "🖊️",
    },
    {
        id: 6,
        title: "Кружка",
        category: "Для дома",
        price: 450,
        emoji: "☕",
    },
    {
        id: 7,
        title: "Настольная лампа",
        category: "Для дома",
        price: 1800,
        emoji: "💡",
    },
    {
        id: 8,
        title: "Растение",
        category: "Для дома",
        price: 700,
        emoji: "🪴",
    },
];