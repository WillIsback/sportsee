import { useState, useEffect, useRef } from 'react';
import { MISTRAL_RATE_LIMIT } from '@/lib/constants';


export default function useRateLimit () {
    const [isRateLimited, setRateLimited] = useState({state:false,timeStamp:0});    const { timeframe } = MISTRAL_RATE_LIMIT[0];
    const timeoutIdRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        };
    }, []);   

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