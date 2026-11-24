import {
    describe,
    it,
    expect,
    beforeEach,
    afterEach,
} from "vitest";

import {
    render,
    screen,
    fireEvent,
    cleanup,
} from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

import App from "../App";

beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("theme", "light");
});

afterEach(cleanup);

describe("Мини-маркет", () => {
    it("отображает товары после загрузки", async () => {
        render(<App />);

        expect(
            await screen.findByText("Наушники", {}, {
                timeout: 3000,
            })
        ).toBeInTheDocument();
    });

    it("фильтрует товары по поисковому запросу", async () => {
        render(<App />);

        await screen.findByText("Наушники", {}, {
            timeout: 3000,
        });

        const input = screen.getByRole("textbox", {
            name: "Поиск товаров",
        });

        fireEvent.change(input, {
            target: { value: "Кружка" },
        });

        expect(
            screen.getByText("Кружка")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Наушники")
        ).not.toBeInTheDocument();
    });

    it("показывает пустое состояние", async () => {
        render(<App />);

        await screen.findByText("Наушники", {}, {
            timeout: 3000,
        });

        const input = screen.getByRole("textbox", {
            name: "Поиск товаров",
        });

        fireEvent.change(input, {
            target: { value: "Несуществующий товар" },
        });

        expect(
            screen.getByText("Товары не найдены")
        ).toBeInTheDocument();
    });
});