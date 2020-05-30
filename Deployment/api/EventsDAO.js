import User from "../models/user";

/* METODOS ASYNC */

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
                eventType: event.event_type,
                hour: event.hour,
                date: event.date,
                endDate: event.end_date,
                totalTimes: event.total_times,
                totalTimesDone: event.total_times_today,
                time: event.time,
                defaultTime: event.defaultTime,
                timers: event.timers,
                todayChecked: event.todayChecked,
                totalTimesChecked: event.totalTimesChecked,
                actualStreak: event.actualStreak,
                bestStreak: event.bestStreak,
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
                    todayChecked: modifiedEvent.todayChecked,
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
 * marca a hecho el check de hoy (este se rinicia cada dia a su valor
 * por defecto: false)
 * @param {*} event 
 */
export const doneEvent = async (event) => {
    try {
        fetch(
            `http://192.168.0.106:3000/doneEvent/`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: event.id,
                    actualStreak: event.actualStreak,
                    bestStreak: event.bestStreak,
                    // userId: User._id,
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

/**
 * obtiene el ultimo id de los eventos introducidos
 */
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

export const getBestStreak = async (userId) => {
    try {
        const request = await fetch(
            `http://192.168.0.106:3000/bestSreak/${userId}`
        );
        const bestSreak = await request.json();

        return bestSreak[0].perfect_days;

    } catch (error) {
        console.error(error);
    }
}

/* FILTRADO DE EVENTOS */

/**
 * filtra los eventos para el dia seleccionado
 * @param {*} totalEvents eventos para filtrar
 * @param {*} date fecha actual
 */
export const getFilterEvents = (totalEvents, date) => {
    let filteredEvents = [];

    totalEvents.forEach(element => {
        if (dateInRange(element, date)) {
            filteredEvents.push(element);
        }
    });

    return filteredEvents;
}

/* METODOS AUXILIARES */

export const dateInRange = (event, today) => {
    let inRange;
    const todayDate = [];
    const startDate = [];
    const endDate = [];
    let todayValue = 0;
    let startValue = 0;
    let endValue = 0;

    // formateo de la fecha
    today.split('-').forEach(element => {
        todayDate.push(parseInt(element))
    });
    event.date.split('-').forEach(element => {
        startDate.push(parseInt(element))
    });
    event.endDate.split('-').forEach(element => {
        endDate.push(parseInt(element))
    });

    ((todayDate[0] + "").length == 0) && (todayDate[0] = "0" + todayDate[0]);
    ((todayDate[1] + "").length == 1) && (todayDate[1] = "0" + todayDate[1]);
    ((startDate[0] + "").length == 0) && (startDate[0] = "0" + startDate[0]);
    ((startDate[1] + "").length == 1) && (startDate[1] = "0" + startDate[1]);
    ((endDate[0] + "").length == 0) && (endDate[0] = "0" + endDate[0]);
    ((endDate[1] + "").length == 1) && (endDate[1] = "0" + endDate[1]);

    todayValue = parseInt(todayDate[2] + "" + todayDate[1] + "" + todayDate[0]);
    startValue = parseInt(startDate[2] + "" + startDate[1] + "" + startDate[0]);
    endValue = parseInt(endDate[2] + "" + endDate[1] + "" + endDate[0]);

    return ((todayValue >= startValue) && (todayValue <= endValue));
}