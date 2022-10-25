import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core'
import { WeatherService } from '../../services/weather.service'
import { ResponseWeatherApiInterface } from '../../interfaces/api-response.interface'
import { CoordinatesService } from '../../services/coordinates.service'
import { CoordinatesResponseInterface } from '../../interfaces/coordinates-response.interface'
import { MatPaginator } from '@angular/material/paginator'


@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    providers: [WeatherService, CoordinatesService],
})
export class WeatherComponent implements OnInit, AfterViewInit {

    weatherFeatures: ResponseWeatherApiInterface

    storage: any[] = []
    dropStorage: any

    length: number
    pageSize: number = 4

    @ViewChild(MatPaginator) paginator: MatPaginator

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

        // init data from localStorage
        this.initLocalStorageData()
    }

    initLocalStorageData() {
        for (let i = 0; i < localStorage.length; i++) {
            this.storage.push(...JSON.parse(localStorage.getItem(`${localStorage.key(i)}`) as any))
        }
    }

    addToSavedLocations() {
        const newObj = { ...this.weatherFeatures }

        let check = this.storage.find(item => item.id === newObj.id)

        if (check) {
            console.log('this city id is existing', newObj.id)
        } else {
            this.storage.push(newObj)
        }

        localStorage.setItem(`${newObj.id}`, JSON.stringify(this.storage))
    }

    deleteSavedLocation(id: number) {
        let valueToDelete = this.storage.findIndex((obj) => obj.id === id)
        this.storage.splice(valueToDelete)
        localStorage.removeItem(`${id}`)
    }

    ngAfterViewInit() {
        this.paginator.page
            .pipe()
            .subscribe(value => {
                console.log('tapSub', value)
                return this.dropStorage = value
            })
    }
}
