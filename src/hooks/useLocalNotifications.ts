import { useEffect, useCallback } from 'react';

// Define the TimestampTrigger interface as it is experimental
interface TimestampTrigger {
    timestamp: number;
}
declare const TimestampTrigger: {
    prototype: TimestampTrigger;
    new(timestamp: number): TimestampTrigger;
};

export const useLocalNotifications = () => {
    const NOTIFICATION_TAG = 'impostor-retention';

    const requestPermission = useCallback(async () => {
        if (!('Notification' in window)) return;
        if (Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    }, []);

    const scheduleNotification = useCallback(async () => {
        if (!('Notification' in window) || Notification.permission !== 'granted') return;
        if (!('serviceWorker' in navigator)) return;

        try {
            const reg = await navigator.serviceWorker.ready;
            const DELAY_MS = 10 * 1000; // 10 seconds for testing (User can change back to 24h)
            const triggerDate = Date.now() + DELAY_MS;
            const baseUrl = import.meta.env.BASE_URL;
            const iconPath = `${baseUrl}pwa-192x192.png`.replace('//', '/'); // Ensure no double slashes

            const notificationOptions = {
                body: 'Te extrañamos. Vamos a jugar!',
                icon: iconPath,
                tag: NOTIFICATION_TAG,
                vibrate: [200, 100, 200],
                data: { url: window.location.href }
            };

            // 1. INTENTO: API Experimental (Notification Triggers)
            if ('showTrigger' in Notification.prototype) {
                await reg.showNotification('¿Quién es el Impostor?', {
                    ...notificationOptions,
                    showTrigger: new TimestampTrigger(triggerDate), // @ts-ignore o cast
                } as any);
                console.log('Notificación programada con TimestampTrigger (Preciso)');
            }
            // 2. FALLBACK: Método clásico (setTimeout + SW)
            else {
                console.log('Triggers no soportados. Usando Fallback setTimeout.');

                // Guardamos el ID del timeout en una ref o variable global si quisieras cancelarlo estrictamente,
                // pero como limpias al volver con cancelNotifications, el riesgo es bajo si el usuario vuelve rápido.
                setTimeout(() => {
                    // Doble chequeo: solo sonar si SEGUIMOS ocultos
                    if (document.visibilityState === 'hidden') {
                        reg.showNotification('¿Quién es el Impostor?', notificationOptions);
                    }
                }, DELAY_MS);
            }

        } catch (e) {
            console.error('Error scheduling notification:', e);
        }
    }, []);

    const cancelNotifications = useCallback(async () => {
        if (!('Notification' in window) || !('serviceWorker' in navigator)) return;

        try {
            const reg = await navigator.serviceWorker.ready;
            const notifications = await reg.getNotifications({ tag: NOTIFICATION_TAG });

            for (const notification of notifications) {
                notification.close();
            }
            if (notifications.length > 0) {
                console.log('Pending notifications cancelled');
            }
        } catch (e) {
            console.error('Error cancelling notifications:', e);
        }
    }, []);

    useEffect(() => {
        // Cancel on mount (game start/return)
        cancelNotifications();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                scheduleNotification();
            } else {
                cancelNotifications();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [scheduleNotification, cancelNotifications]);

    return { requestPermission };
};
