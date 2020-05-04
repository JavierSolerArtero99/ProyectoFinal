/* EVENTS UTILS */

/**
 * Metodo para la creación de un nuevo evento
 * @param {*} attrs 
 */
export const newEvent = (attrs) => {
    console.log("desde new event");
    console.log((attrs));

    const event = {
        name: attrs.name,
        icon: attrs.icon,
        color: attrs.color,
        totalTimes: attrs.totalTimes,
        time: attrs.time,
        repeat: attrs.repeat,
        hour: attrs.hour,
    };

    return event;
};