import { sanitizeRequest } from '@/lib/askai.lib';
import { useState, useTransition } from 'react';


export default function useSanitization () {
    const [result, setResult] = useState({});
    const [isPending, startTransition] = useTransition(false);
    function executeSanitization (message) {
        startTransition(async() => {
            try{
                const sanitizeResult = await sanitizeRequest(message);
                console.log("sanitizeRequest result : ", sanitizeResult);
                if(!sanitizeResult.success){ 
                    setResult({
                            success: sanitizeResult?.success,
                            data: null,
                            error: sanitizeResult?.error,
                    });
                }
                // console.log("sanitizeResult.data : ", sanitizeResult?.data);
                setResult({
                    success: sanitizeResult?.success,
                    data: sanitizeResult?.data,
                    error: sanitizeResult?.error,
                });
            } catch(e) {
                setResult({
                    success: false,
                    data: null,
                    error: e,
                });
                console.error("Error sanitization : ", e);
            }
        });
    }
    return [isPending, result, executeSanitization];
}