import {
    Injectable,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
    map,
    Observable,
} from 'rxjs'
import { ResponseApiInterface } from '../interfaces/api-response.interface'
import { DescriptionInterface } from '../interfaces/descriptionInterface'
import { CoordinatesService } from './coordinates.service'
import {
    UserCoordinatesInterface,
    UserCoordsInterface,
} from '../interfaces/user-coordinates.interface'


@Injectable({
    providedIn: 'root',
})

export class WeatherService {

    position: any
    // apiLink: string = ''
    // apiLink = `https://fcc-weather-api.glitch.me/api/current?lat=40&lon=39`
    apiLink = 'https://fcc-weather-api.glitch.me/api/current?'

    constructor(
        private http: HttpClient,
        // public userCoordinatesService: CoordinatesService,
    ) {
        // this.position = this.userCoordinatesService.getCoordinates()
        // this.apiLink = `https://fcc-weather-api.glitch.me/api/current?lat=${ this.position.latitude }&lon=${ this.position.longitude }`
        // console.log('get', this.apiLink)

    }

    getWeatherData(userCoords: any ): Observable<ResponseApiInterface> {
        console.log('from component', userCoords)
        this.apiLink += userCoords
        console.log('link', this.apiLink)
        return this.http.get<ResponseApiInterface>(this.apiLink).pipe(
            map( response => this.processResponse(response))
        )
    }

    private processResponse(response: ResponseApiInterface): ResponseApiInterface {
        return {
            coord: { ...response.coord },
            // weather: response.weather.map( (param: any) => (<DescriptionInterface>{
            //     id: param.id,
            //     main: param.main,
            //     description: param.description,
            //     icon: param.icon,
            // })),
            weather: { ...response.weather },
            base: response.base,
            main: { ...response.main },
            visibility: response.visibility,
            wind: { ...response.wind },
            clouds: { ...response.clouds },
            dt: response.dt,
            sys: {...response.sys },
            timezone: response.timezone,
            id: response.id,
            name: response.name,
            cod: response.cod
        }
    }
}
