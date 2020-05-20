import User from "../models/user";

/**
 * obtiene todos los eventos de un usuario en concreto
 * @param {*} userId 
 */
export const findAllByPK = async (userId) => {
    try {
        const events = await fetch(
            `http://192.168.0.106:3000/events/${userId}`,
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
                defaultTime: event.defaultTime,
                timers: event.timers,
                isRunning: (event.isRunning > 0),
            })
        });

        return finalEvents;

    } catch (error) {
        console.error(error);
    }
}

/**
 * modifica un evento pasado por parametro
 * @param {*} modifiedEvent 
 */
export const updateEvent = async (modifiedEvent) => {
    try {
        fetch(
            `http://192.168.0.106:3000/updateEvent/${modifiedEvent.id}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: modifiedEvent.newName,
                    description: modifiedEvent.newDescription,
                    icon: modifiedEvent.newIcon,
                    color: modifiedEvent.newColor,
                    totalTimes: modifiedEvent.newTotalTimes,
                    totalTimesDone: 0,
                    time: modifiedEvent.newTime,
                    repeat: modifiedEvent.newRepeat,
                    hour: modifiedEvent.hour,
                    date: modifiedEvent.newDate,
                    endDate: modifiedEvent.newEndDate,
                    timers: modifiedEvent.newTimers,
                    time: modifiedEvent.newTime,
                    eventType: modifiedEvent.eventType,
                    isRuning: 0,
                    userId: User._id,
                })
            }
        )


    } catch (error) {
        console.error(error);
    }
}

/**
 * añade un nuevo evento
 * @param {*} modifiedEvent 
 */
export const addNewEvent = async (modifiedEvent) => {
    try {
        fetch(
            `http://192.168.0.106:3000/updateEvent/${modifiedEvent.id}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: modifiedEvent.name,
                    description: modifiedEvent.description,
                    icon: modifiedEvent.icon,
                    color: modifiedEvent.color,
                    totalTimes: modifiedEvent.totalTimes,
                    totalTimesDone: 0,
                    time: modifiedEvent.time,
                    repeat: modifiedEvent.repeat,
                    hour: modifiedEvent.hour,
                    date: modifiedEvent.date,
                    endDate: modifiedEvent.endDate,
                    timers: modifiedEvent.timers,
                    time: modifiedEvent.time,
                    eventType: modifiedEvent.eventType,
                    isRuning: 0,
                    userId: User._id,
                })
            }
        )


    } catch (error) {
        console.error(error);
    }
}

/**
 * elimina un evento la id del cual es pasado por parametro como
 * referencia
 * @param {*} eventToDelete 
 */
export const deleteSelectedEvent = async (eventToDelete) => {
    try {
        fetch(
            `http://192.168.0.106:3000/deleteEvent/${eventToDelete}`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}

export const getLastEventId = async () => {
    try {
        const request = await fetch(
            `http://192.168.0.106:3000/lastEvent/`
        );
        const lastId = await request.json();

        return lastId[0].id

    } catch (error) {
        console.error(error);
    }
}