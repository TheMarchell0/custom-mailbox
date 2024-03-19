function getCurrentTime(time) {
    let [hours, minutes] = time.split(':');
    hours = hours < 10 ? '0'+(hours-1) : hours-1;
    return hours+':'+minutes;
}

export default getCurrentTime;