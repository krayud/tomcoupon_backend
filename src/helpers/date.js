import moment from "moment";


const getCurrentDate = () => {
    return moment().tz("Asia/Tomsk").format('YYYY-MM-DD');
}

const getCurrentTimestamp = () => {
    return moment().format('x');
}

export {
    getCurrentDate,
    getCurrentTimestamp,
}
