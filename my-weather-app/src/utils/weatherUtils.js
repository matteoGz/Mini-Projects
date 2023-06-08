import { uvIndex } from "../models/uvIndex";

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

export function degreesToDirection(inputDegrees){
    const directions = [ "N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    
    inputDegrees = inputDegrees % 360;
    if(inputDegrees < 0){
        inputDegrees += 360;
    }

    const indexOfDirections = Math.floor(inputDegrees/45);
    
    return  directions[indexOfDirections];
}

export function getUvIndexColor(uvIndexValue){
    let checkColor = 
          uvIndex.lowUv.minValue <= uvIndexValue <= uvIndex.lowUv.maxValue ? uvIndex.lowUv.color
        : uvIndex.moderateUv.minValue <= uvIndexValue <= uvIndex.moderateUv.maxValue ? uvIndex.moderateUv.color
        : uvIndex.highUv.minValue <= uvIndexValue <= uvIndex.highUv.maxValue ? uvIndex.highUv.color
        : uvIndex.veryHighUv.minValue <= uvIndexValue <= uvIndex.veryHighUv.maxValue ? uvIndex.veryHighUv.color
        : uvIndex.extremeUv.minValue <= uvIndexValue <= uvIndex.extremeUv.maxValue ? uvIndex.extremeUv.color
        : "black"

    console.log("color for uvIndexVal-"+uvIndexValue+"-is: "+checkColor)

    return checkColor;
}