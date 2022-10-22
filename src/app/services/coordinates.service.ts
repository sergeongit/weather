import { Injectable } from '@angular/core'
import {
    UserCoordinatesInterface,
    UserCoordsInterface,
} from '../interfaces/user-coordinates.interface'
import {
    Observable,
    Subject,
} from 'rxjs'
import {
    CompleteOnDestroy,
    ValueSubject,
} from '@typeheim/fire-rx'


@Injectable({
    providedIn: 'root',
})

export class CoordinatesService {

    @CompleteOnDestroy()
    usersLocationSubject = new ValueSubject({})

    private started = false

    getCoordinates() {
        if (!this.started) {
            this.started = true
            navigator.geolocation.getCurrentPosition(position => {
                    this.usersLocationSubject.next(position)
                },
                (error) => {
                    this.usersLocationSubject.error(error)
                },
            )
        }
    }

    // getCoordinates(): any {
    //     return navigator.geolocation.getCurrentPosition((position: UserCoordinatesInterface) => {
    //             console.log('coordinatesService____', position.coords)
    //             return position.coords
    //             // return {
    //             //     coords: { ...position.coords },
    //             //     timestamp: position.timestamp
    //             // }
    //         },
    //         positionError => console.log(positionError))
    // }
}
