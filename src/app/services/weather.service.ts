import { Injectable, } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
    map,
    Observable,
} from 'rxjs'
import { ResponseWeatherApiInterface } from '../interfaces/api-response.interface'


@Injectable({
    providedIn: 'root',
})

export class WeatherService {

    // apiLink = `https://fcc-weather-api.glitch.me/api/current?lat=40&lon=39` // example of endpoint
    apiLink = 'https://fcc-weather-api.glitch.me/api/current?'

    constructor(
        private http: HttpClient,
    ) {}

    getWeatherData(userCoords: any ): Observable<ResponseWeatherApiInterface> {
        // received user's geo coordinates from CoordinatesService and made endpoint for Weather API
        this.apiLink += `lat=${ userCoords.latitude }&lon=${ userCoords.longitude }`

        return this.http.get<ResponseWeatherApiInterface>(this.apiLink).pipe(
            map( response => this.processResponse(response))
        )
    }

    private processResponse(response: ResponseWeatherApiInterface): ResponseWeatherApiInterface {
        return {
            coord: { ...response.coord },
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
