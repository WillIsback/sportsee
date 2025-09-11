/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/hooks/useAnimation.js
    objectives: Hook custom pour l'animation des Recharts
    lastUpdate : 11/09/2025
*/

import { useState, useEffect } from 'react';

export const useChartsHover = (primaryColor, secondaryColor, isHovered) => {
    const [contentColor, setContentColor] = useState('');

    useEffect(() => {
        if(isHovered){
            setContentColor(primaryColor);
        }
        else{
            setContentColor(secondaryColor);
        }

    },[isHovered]);

    return contentColor
};