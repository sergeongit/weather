import {
    Component,
    OnInit,
} from '@angular/core'
import { WeatherService } from '../../services/weather.service'
import { ResponseApiInterface } from '../../interfaces/api-response.interface'

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    providers: [WeatherService]
})
export class WeatherComponent implements OnInit {

    weatherFeatures: ResponseApiInterface

    constructor(
        private weatherService: WeatherService,
    ) { }

    ngOnInit(): void {
        this.weatherService.getWeatherData()
            .subscribe((value: any) => {
                this.weatherFeatures = value
        })
    }
}
