import { CoordinatesInterface } from './coordinates.interface'
import { DescriptionInterface } from './descriptionInterface'
import { MainParametersInterface } from './main-parameters.interface'

export interface ResponseWeatherApiInterface {
    coord: CoordinatesInterface
    weather: DescriptionInterface
    base: string
    main: MainParametersInterface
    visibility: number
    wind: object
    clouds: object
    dt: number
    sys: object
    timezone: number
    id: number
    name: string
    cod: number
}
