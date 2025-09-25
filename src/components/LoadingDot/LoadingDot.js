'use client';
import styles from './LoadingDot.module.css';
import { useEffect, useState } from 'react';

/**
 * Brief: Composant SVG représentant un point de chargement par défaut
 * @returns {JSX.Element} Icône SVG de cercle coloré pour l'animation de chargement
 */
const DefaultDot = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
    <circle cx="3.85194" cy="4.44447" r="3.55556" fill="#FCC1B6"/>
  </svg>)
};


/**
 * Brief: Composant d'animation de chargement avec points clignotants
 * 
 * @returns {JSX.Element} Animation de 3 points qui clignotent en séquence
 */
export default function LoadingDot () {
    const [activeDotIndex, setActiveDotIndex] = useState(0);
    const [dots] = useState(() => [
      { id: crypto.randomUUID(), name: 'Dot 1' },
      { id: crypto.randomUUID(), name: 'Dot 2' }, 
      { id: crypto.randomUUID(), name: 'Dot 3' }
    ]);

    useEffect(() => {
      const timer = setInterval(() => {
        setActiveDotIndex(prev => (prev + 1) % 3);
      }, 500);
      
      // Cleanup OBLIGATOIRE
      return () => clearInterval(timer);
    }, []);

    return (
          <div className={styles.dotBox}>
          {dots.map((dot, index) => (
            <div 
              key={dot.id}
              className={`${index === activeDotIndex ? styles.active : ''} ${styles.dot}`}
            >
              {<DefaultDot />}
            </div>
          ))}
        </div>

    );
}