import { useState, useEffect, useRef } from 'react';
import { MISTRAL_RATE_LIMIT } from '@/lib/constants';

/**
 * Brief: Hook personnalisé pour gérer la limitation du taux de requêtes (rate limiting)
 * 
 * @returns {Array} Tableau contenant [isRateLimited, activateRateLimit] pour contrôler les limitations
 */
export default function useRateLimit () {
    const [isRateLimited, setRateLimited] = useState({state:false,timeStamp:0});    const { timeframe } = MISTRAL_RATE_LIMIT[0];
    const timeoutIdRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        };
    }, []);   

    /**
     * Brief: Active la limitation de taux pour empêcher les requêtes trop fréquentes
     */
    function activateRateLimit() {
        setRateLimited({
            state: true,
            timeStamp: Date.now()+timeframe,
        });
        timeoutIdRef.current = setTimeout(() => {
            setRateLimited({
            state: false,
            timeStamp: 0,
            });
        }, timeframe);
    }

    return [isRateLimited,  activateRateLimit ];
}