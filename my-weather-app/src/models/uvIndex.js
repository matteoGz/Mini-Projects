import { Typography } from "@mui/material"

export const uvIndex = {
    lowUv : { uvValue: new Range(0, 3), advise:"You can safely stay outside"},
    moderateUv : { uvValue: new Range(3, 6), advise:<Typography>Wear protective clothing/hat and apply <strong>SPF-15+</strong></Typography>},
    highUv : { uvValue: new Range(6, 8), advise:<Typography>Wear protective clothing/hat, sunglasses and apply <strong>SPF-30+</strong></Typography>},
    veryHighUv : { uvValue: new Range(8, 10), advise:<Typography>Wear protective clothing/hat, sunglasses and apply <strong>SPF-50: </strong><em>Seek shade recommended</em></Typography>},
    extremeUv : { uvValue: new Range(10), advise:<Typography><strong>Avoid sun from 10 AM to 4 PM</strong> Wear protective clothing/hat, sunglasses and apply <strong>SPF-50+</strong></Typography>}
}