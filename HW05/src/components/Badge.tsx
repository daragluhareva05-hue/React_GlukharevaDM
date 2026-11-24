import styled from "styled-components";

export const Badge = styled.span<{
    $variant?: "default" | "success";
}>`
    display: inline-block;
    padding: 4px 8px;
    border-radius: ${({ theme }) => theme.radius.sm};
    font-size: 12px;

    background: ${({ theme }) => theme.colors.secondary};

    color: ${({ theme, $variant }) =>
    $variant === "success"
        ? theme.colors.success
        : theme.colors.text};
`;