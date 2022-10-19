import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
    map,
    Observable,
} from 'rxjs'
import { ResponseApiInterface } from '../interfaces/api-response.interface'
import { DescriptionInterface } from '../interfaces/descriptionInterface'


@Injectable({
    providedIn: 'root',
})

export class WeatherService {

    apiLink = 'https://fcc-weather-api.glitch.me/api/current?lat=48.46107096624887&lon=35.016826831859625'

    constructor(
        private http: HttpClient,
    ) {}

    getWeatherData(): Observable<ResponseApiInterface> {
        return this.http.get<ResponseApiInterface>(this.apiLink).pipe(
            map( response => this.processResponse(response))
        )
    }

    private processResponse(response: ResponseApiInterface): ResponseApiInterface {
        return {
            coord: { ...response.coord },
            weather: response.weather.map( (param: any) => (<DescriptionInterface>{
                id: param.id,
                main: param.main,
                description: param.description,
                icon: param.icon,
            })),
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
