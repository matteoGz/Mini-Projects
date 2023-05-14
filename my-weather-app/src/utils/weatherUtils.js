export function convertHourlyTime(inputFullDate) {
    let hourlyTime = inputFullDate.slice(11, 16)
    return hourlyTime;
} 

export function getDailyInfo(inputInfo){
    let dailyInfo = inputInfo.slice(0, 24)
    return dailyInfo;
}

export function getNext7DaysInfo(inputInfo){
    let next7DaysInfo = inputInfo.slice(25, (inputInfo.length - 1))
    return next7DaysInfo;
}