export function convertDateFormat(inputDate){
    let day = inputDate.slice(8, 11)
    let month = inputDate.slice(4, 8)
    let year = inputDate.slice(0, 4)
    let convertedDate = (day+month+year).replaceAll('-','/')
    return convertedDate;
}

export function convertHourlyTime(inputFullDate) {
    let hourlyTime = inputFullDate.slice(11, 16)
    return hourlyTime;
} 

export function getDailyInfo(inputInfo){
    let dailyInfo = inputInfo.slice(0, 24)
    return dailyInfo;
}

export function getNext7DaysInfo(inputInfo){
    let next7DaysInfo = inputInfo.slice(24, inputInfo.length)
    return next7DaysInfo;
}