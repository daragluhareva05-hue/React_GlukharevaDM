import styled from "styled-components";

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;