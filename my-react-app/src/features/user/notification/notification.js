import React, { useEffect } from 'react';

const Notification = () => {
    useEffect(() => {
        const eventSource = new EventSource('https://intense-inlet-40544-607910b59282.herokuapp.com/api/events');

        eventSource.onmessage = function(event) {
            const data = JSON.parse(event.data);
            alert(`Notification Title: ${data.title}\nMessage: ${data.message}`);
        };

        eventSource.onerror = function(err) {
            console.error('EventSource failed:', err);
        };

        // Cleanup on component unmount
        return () => {
            eventSource.close();
        };
    }, []);

    return <div>Notifications</div>;
};

export default Notification;
