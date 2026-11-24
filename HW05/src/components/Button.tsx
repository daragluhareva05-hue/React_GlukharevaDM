import styled, { css, keyframes } from "styled-components";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
}

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.span`
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;

const StyledButton = styled.button<{
    $variant: Variant;
    $size: Size;
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border: 1px solid transparent;
    border-radius: ${({ theme }) => theme.radius.md};
    font-weight: 500;
    transition: background 0.2s;

    ${({ $size }) => {
    switch ($size) {
        case "sm":
            return css`
                    padding: 6px 12px;
                    font-size: 12px;
                `;
        case "lg":
            return css`
                    padding: 12px 24px;
                    font-size: 18px;
                `;
        default:
            return css`
                    padding: 8px 16px;
                    font-size: 14px;
                `;
    }
}}

    ${({ $variant, theme }) => {
    switch ($variant) {
        case "secondary":
            return css`
                    background: ${theme.colors.secondary};
                    color: ${theme.colors.text};

                    &:hover:not(:disabled) {
                        background: ${theme.colors.secondaryHover};
                    }
                `;

        case "outline":
            return css`
                    background: transparent;
                    color: ${theme.colors.text};
                    border-color: ${theme.colors.focus};

                    &:hover:not(:disabled) {
                        background: ${theme.colors.secondary};
                    }
                `;

        case "danger":
            return css`
                    background: ${theme.colors.danger};
                    color: ${theme.colors.onDanger};

                    &:hover:not(:disabled) {
                        background: ${theme.colors.dangerHover};
                    }
                `;

        default:
            return css`
                    background: ${theme.colors.primary};
                    color: ${theme.colors.onPrimary};

                    &:hover:not(:disabled) {
                        background: ${theme.colors.primaryHover};
                    }
                `;
    }
}}

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 3px;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export function Button({
                           variant = "primary",
                           size = "md",
                           loading = false,
                           disabled,
                           children,
                           type = "button",
                           ...props
                       }: ButtonProps) {
    return (
        <StyledButton
            {...props}
            type={type}
            $variant={variant}
            $size={size}
            disabled={disabled || loading}
            aria-busy={loading}
        >
            {loading && <Spinner aria-hidden="true" />}
            {children}
        </StyledButton>
    );
}