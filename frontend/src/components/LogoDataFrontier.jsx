import React from 'react';

const LogoDataFrontier = ({ className }) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
    >
        {/* Alça da Sacola */}
        <path d="M35 35C35 25 40 20 50 20C60 20 65 25 65 35" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        {/* Corpo da Sacola */}
        <path d="M25 35H75L80 85H20L25 35Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4" />
        {/* Detalhe Tech (Linhas de Circuito) */}
        <path d="M40 50H60M40 65H55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="65" cy="65" r="3" fill="currentColor" />
    </svg>
);

export default LogoDataFrontier;
