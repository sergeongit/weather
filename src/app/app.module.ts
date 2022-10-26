import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { WeatherComponent } from './components/weather/weather.component'
import { HttpClientModule } from '@angular/common/http'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import {
    NgbAlertModule,
    NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'

@NgModule({
    declarations: [
        AppComponent,
        WeatherComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatButtonModule,
        MatCardModule,
        NgbPaginationModule,
        NgbAlertModule,

    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
