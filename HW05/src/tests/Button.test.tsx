import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ThemeProvider } from "styled-components";

import { Button } from "../components/Button";
import { light } from "../theme";

afterEach(cleanup);

describe("Button", () => {
    it("отображает текст и реагирует на нажатие", () => {
        const handleClick = vi.fn();

        render(
            <ThemeProvider theme={light}>
                <Button onClick={handleClick}>
                    В корзину
                </Button>
            </ThemeProvider>
        );

        const button = screen.getByRole("button", {
            name: "В корзину",
        });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("блокируется во время загрузки", () => {
        render(
            <ThemeProvider theme={light}>
                <Button loading>Загрузка</Button>
            </ThemeProvider>
        );

        const button = screen.getByRole("button");

        expect(button).toBeDisabled();
        expect(button).toHaveAttribute("aria-busy", "true");
    });
});