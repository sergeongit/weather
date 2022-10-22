import {
    Component,
    OnInit,
} from '@angular/core'
import { WeatherService } from '../../services/weather.service'
import { ResponseApiInterface } from '../../interfaces/api-response.interface'
import { CoordinatesService } from '../../services/coordinates.service'
import {
    UserCoordinatesInterface,
    UserCoordsInterface,
} from '../../interfaces/user-coordinates.interface'

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    providers: [WeatherService, CoordinatesService]
})
export class WeatherComponent implements OnInit {

    cords: any
    lat: number
    lon: number
    weatherFeatures: ResponseApiInterface

    constructor(
        private weatherService: WeatherService,
        public userCoordinatesService: CoordinatesService,
    ) { }

    ngOnInit(): void {
        // this.cords = this.userCoordinatesService.getCoordinates()
        //
        // this.userCoordinatesService.usersLocationSubject.subscribe(v => console.log('Subject',v))
        //
        // console.log('QQ',this.cords)
        this.getLocation()

            // this.weatherService.getWeatherData(LOC)
            //     .subscribe((value: any) => {
            //         this.weatherFeatures = value
            //     })
    }

    getLocation(): any {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                    this.lat = position.coords.latitude
                    this.lon = position.coords.longitude
                    this.cords = `lat=${this.lat}&lon=${this.lon}`
                    //console.log('CORDDDDDD', this.cords)

                this.weatherService.getWeatherData(this.cords)
                    .subscribe((value: any) => {
                        console.log('VVVV', value)
                        this.weatherFeatures = value
                    })
            },
                positionError => console.log(positionError))
        }
    }
}
