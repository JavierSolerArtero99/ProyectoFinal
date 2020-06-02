export default class Stats {
    
    /**
     * devuelve la cantidad de dias que hay entre dos fechas
     */
    static getDays = (begin, end) => {
        let beginArray = begin.split("-")
        let endArray = end.split("-")
        let beginDate;
        let endDate;
        let days;

        beginArray[1] = (parseInt(beginArray[1]) + 1) + "";
        endArray[1] = (parseInt(endArray[1]) + 1) + "";

        (beginArray[0].length == 1) && (beginArray[0] = "0" + beginArray[0]);
        (beginArray[1].length == 1) && (beginArray[1] = "0" + beginArray[1]);
        (endArray[0].length == 1) && (endArray[0] = "0" + endArray[1]);
        (endArray[1].length == 1) && (endArray[1] = "0" + endArray[1]);

        beginDate = Date.parse(beginArray[2] + "/" + beginArray[1] + "/" + beginArray[0]);
        endDate = Date.parse(endArray[2] + "/" + endArray[1] + "/" + endArray[0]);

        days = (((((endDate - beginDate) / 1000) / 60) / 60) / 24)

        return (days)
    }
}