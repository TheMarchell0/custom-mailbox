import {month} from "./monthsCurrentFormat.js";
import getCurrentTime from "./getCurrentTime.js";

function getDate(date) {
    const time = date.split(' ');
    return `${getCurrentTime(time[4].slice(0, 5))}, ${time[1]+' '+month[time[2]]}`;
}

export default getDate;