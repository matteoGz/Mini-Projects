import { Typography } from "@mui/material"

export const uvIndex = {
    lowUv : { minValue: 0, maxValue: 3, color: "green", advise:"You can safely stay outside" },
    moderateUv : { minValue: 3, maxValue: 6, color: "yellow", advise:<Typography>Wear protective clothing/hat and apply <strong>SPF-15+</strong></Typography>},
    highUv : { minValue: 6, maxValue: 8, color: "darkYellow", advise:<Typography>Wear protective clothing/hat, sunglasses and apply <strong>SPF-30+</strong></Typography>},
    veryHighUv : { minValue: 8, maxValue: 10, color: "orange", advise:<Typography>Wear protective clothing/hat, sunglasses and apply <strong>SPF-50: </strong><em>Seek shade recommended</em></Typography>},
    extremeUv : { minValue: 10, maxValue: 100, color: "red", advise:<Typography><strong>Avoid sun from 10 AM to 4 PM</strong> Wear protective clothing/hat, sunglasses and apply <strong>SPF-50+</strong></Typography>}
}