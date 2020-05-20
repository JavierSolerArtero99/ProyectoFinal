/* EVENTS UTILS */

/**
 * Metodo para la creación de un nuevo evento
 * @param {*} attrs 
 */
export const newEvent = (attrs) => {
    const event = {
        id: attrs.id,
        name: attrs.name,
        icon: attrs.icon,
        color: attrs.color,
        totalTimes: attrs.totalTimes,
        totalTimesDone: 0,
        time: attrs.time,
        defaultTime: attrs.time,
        repeat: attrs.repeat,
        hour: attrs.hour,
        description: attrs.description,
        date: attrs.date,
        endDate: attrs.endDate,
        timers: attrs.timers,
        eventType: attrs.eventType,
    };

    return event;
};