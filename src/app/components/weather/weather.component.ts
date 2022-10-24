import {
    Component,
    OnInit,
} from '@angular/core'
import { WeatherService } from '../../services/weather.service'
import { ResponseWeatherApiInterface } from '../../interfaces/api-response.interface'
import { CoordinatesService } from '../../services/coordinates.service'
import { CoordinatesResponseInterface } from '../../interfaces/coordinates-response.interface'

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    providers: [WeatherService, CoordinatesService],
})
export class WeatherComponent implements OnInit {

    weatherFeatures: ResponseWeatherApiInterface

    locations: any[] = []

    constructor(
        private weatherService: WeatherService,
        public userCoordinatesService: CoordinatesService,
    ) { }

    async ngOnInit(): Promise<any> {
        let userCoords: CoordinatesResponseInterface | undefined

        // at first, we receive data with user's coordinates
        await this.userCoordinatesService.getCoordinates()
                  .then((userCoordsFromService: CoordinatesResponseInterface) => userCoords = userCoordsFromService)

        // after we transfer user's coordinates to weather service
        this.weatherService.getWeatherData(userCoords)

            // and receive a response from Weather API based on current user's location
            .subscribe((value: any) => {
                this.weatherFeatures = value
            })
    }

    addToSavedLocations() {
        const newObj = { ...this.weatherFeatures }
        this.locations.push(newObj)
    }

    deleteSavedLocation(index: number) {
        console.log(index)
        this.locations.splice(this.locations.indexOf(index))
    }
}
