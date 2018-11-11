import dateFns from 'date-fns';

const createTime = (str) => {
    const [ hour, minute ] = str.split(':');
    let date = dateFns.setHours(Date.now(), hour);
    date = dateFns.setMinutes(date, minute);
    return date;
}

const differenceInMinutes = (str1, str2) => {
    return dateFns.differenceInMinutes(createTime(str1), createTime(str2));
}

const hhmm = (date) => {
    return dateFns.format(date, 'hh:mm');
}

export default {
    createTime,
    differenceInMinutes,
    hhmm
}