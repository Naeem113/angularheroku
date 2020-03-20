import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppServicesService } from "./service/app-services.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterailModule } from "./AngularMaterial/materail/materail.module";
import { HeaderComponent } from "./dashBorad/header/header.component";
import { LineChartComponent } from "./dashBorad/Charts/line-chart/line-chart.component";
import { CurrentStatusComponent } from "./dashBorad/CurrentStatus/current-status/current-status.component";
import { LatestDataComponent } from './dashBorad/latest-data/latest-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LineChartComponent,
    CurrentStatusComponent,
    LatestDataComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterailModule
  ],
  providers: [AppServicesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
