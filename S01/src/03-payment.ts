// Задание 3. Платежи (20 минут)
//
// 1. Реализуйте describePayment: switch по метке kind.
// 2. Закройте switch проверкой полноты через never.
// 3. Реализуйте total — сумма только наличных платежей.
// 4. Добавьте четвёртый вариант оплаты и посмотрите, где компилятор
//    покажет незакрытые места.

import { assertNever } from "./01-status";

export type Payment =
    | { kind: "card"; last4: string }
    | { kind: "cash"; amount: number }
    | { kind: "transfer"; iban: string };

export function describePayment(payment: Payment): string {
    switch (payment.kind){
        case "card":
            return `карта ${payment.last4}`;
        case "cash":
            return `наличные ${payment.amount} rub`;
        case "transfer":
            return `переводом ${payment.iban}`;
        default: {
            const check: never = payment;
            return check;
        }
    }
}

export function total(payments: Payment[]): number {
    let sum = 0;

    for(const bill of payments) {
        if (bill.kind === "cash") {
            sum += bill.amount;
        }
    }
    return sum;
}
