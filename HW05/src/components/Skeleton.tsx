import styled, { keyframes } from "styled-components";
import { Card } from "./Card";

const pulse = keyframes`
    0%, 100% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }
`;

const SkeletonBlock = styled.div<{
    $height: string;
    $width?: string;
}>`
    height: ${({ $height }) => $height};
    width: ${({ $width }) => $width || "100%"};

    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.radius.md};

    animation: ${pulse} 1.2s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

export function Skeleton() {
    return (
        <Card aria-hidden="true">
            <SkeletonBlock $height="120px" />
            <SkeletonBlock $height="22px" $width="50%" />
            <SkeletonBlock $height="21px" $width="80%" />
            <SkeletonBlock $height="23px" $width="40%" />
            <SkeletonBlock $height="34px" />
        </Card>
    );
}