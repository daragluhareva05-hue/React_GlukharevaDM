// Задание 2. Карточка пользователя (15 минут)
//
// 1. Реализуйте describeUser.
// 2. Отсутствующий возраст не должен превращаться в "undefined лет".
// 3. Контакт различайте оператором in, а не проверкой на undefined.
// 4. Пустой массив хобби обработайте отдельной фразой.
//
// Без any, as и !.

export type Contact = { email: string } | { phone: string };

export type User = {
    name: string;
    age?: number;
    hobbies: string[];
    contact: Contact;
};

export function describeUser(user: User): string {
    const dcrb: string[] = [];

    dcrb.push(`ФИО: ${user.name}`);
    if (user.age !== undefined) {
        dcrb.push(`возраст: ${user.age} лет`);
    }

    if ("email" in user.contact) {
        dcrb.push(`почта: ${user.contact.email}`);
    } 
    else {
        dcrb.push(`телефон: ${user.contact.phone}`);
    }

    if (user.hobbies.length === 0) {
        dcrb.push("хобби: нет");
    } 
    else {
        dcrb.push(`хобби: ${user.hobbies.join(", ")}`);
    }

        return dcrb.join(", ");


}
