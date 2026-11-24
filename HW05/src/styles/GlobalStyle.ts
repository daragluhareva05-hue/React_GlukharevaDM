import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        transition: background 0.2s, color 0.2s;
    }

    :root[data-theme="light"],
    :root[data-theme="pink"] {
        color-scheme: light;
    }

    :root[data-theme="dark"] {
        color-scheme: dark;
    }

    button, input, select {
        font: inherit;
    }

    button {
        cursor: pointer;
    }

    button:disabled {
        cursor: not-allowed;
    }

    :focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 3px;
    }

    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation: none !important;
            transition: none !important;
        }
    }
`;