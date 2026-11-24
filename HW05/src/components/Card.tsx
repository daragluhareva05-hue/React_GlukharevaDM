import styled from "styled-components";

export const Card = styled.article`
    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 16px;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.lg};

    box-shadow: 0 2px 6px ${({ theme }) => theme.colors.shadow};

    transition: box-shadow 0.2s;

    &:hover {
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }
`;