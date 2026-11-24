import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    padding: 10px 12px;

    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};

    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};

    font-size: 14px;

    &::placeholder {
        color: ${({ theme }) => theme.colors.muted};
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 2px;
    }
`;