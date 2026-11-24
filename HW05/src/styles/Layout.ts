import styled from "styled-components";

export const Container = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;

    margin-bottom: 24px;
`;

export const Filters = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
`;

export const Select = styled.select`
    padding: 10px 12px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 2px;
    }
`;

export const CartInfo = styled.div`
    padding: 12px;
    margin-bottom: 20px;

    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.radius.md};
`;

export const EmptyState = styled.div`
    padding: 40px 20px;
    text-align: center;

    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.muted};
    border-radius: ${({ theme }) => theme.radius.lg};
`;