export const findAllByPK = async (userId) => {
    try {
        const events = await fetch(
            `http://192.168.0.108:3000/events/${userId}`,
        );
        const userEvents = await events.json();
        let finalEvents = [];

        userEvents.forEach(event => {
            finalEvents.push({
                id: event.id,
                name: event.name,
                icon: event.icon,
                color: event.color,
                description: event.description,
                // habit: true,
                eventType: event.event_type,
                hour: event.hour,
                date: event.date,
                endDate: event.end_date,
                totalTimes: event.total_times,
                totalTimesDone: event.total_times_today,
                time: event.time,
                isRunning: (event.isRunning > 0),
            })
        });

        return finalEvents;

    } catch (error) {
        console.error(error);
    }
}