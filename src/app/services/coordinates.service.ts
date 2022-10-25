import { Injectable } from '@angular/core'
import { CoordinatesResponseInterface, } from '../interfaces/coordinates-response.interface'


@Injectable({
    providedIn: 'root',
})

export class CoordinatesService {

    getCoordinates(): any {
        return new Promise((resolve: any) => {
            navigator.geolocation.getCurrentPosition((position: CoordinatesResponseInterface) => {
                    resolve(position.coords)
                }
            )
        })
            .then( value => value )
    }
}
