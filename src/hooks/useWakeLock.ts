import { useEffect, useRef, useCallback } from 'react';

export const useWakeLock = () => {
    const wakeLock = useRef<any>(null);

    const requestWakeLock = useCallback(async () => {
        if ('wakeLock' in navigator) {
            try {
                wakeLock.current = await (navigator as any).wakeLock.request('screen');
                console.log('Wake Lock active');
            } catch (err: any) {
                console.warn(`Wake Lock error: ${err.name}, ${err.message}`);
            }
        } else {
            console.warn('Wake Lock API not supported in this browser');
        }
    }, []);

    const releaseWakeLock = useCallback(async () => {
        if (wakeLock.current) {
            try {
                await wakeLock.current.release();
                wakeLock.current = null;
                console.log('Wake Lock released');
            } catch (err: any) {
                console.warn(`Wake Lock release error: ${err.name}, ${err.message}`);
            }
        }
    }, []);

    useEffect(() => {
        // Request lock on mount
        requestWakeLock();

        // Re-request lock when page becomes visible again (e.g. switching tabs/apps)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                requestWakeLock();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup on unmount
        return () => {
            releaseWakeLock();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [requestWakeLock, releaseWakeLock]);
};
