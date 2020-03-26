import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppServicesService } from "./service/app-services.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterailModule } from "./AngularMaterial/materail/materail.module";
import { HeaderComponent } from "./dashBorad/header/header.component";
import { CurrentStatusComponent } from "./dashBorad/CurrentStatus/current-status/current-status.component";
import { LatestDataComponent } from "./dashBorad/latest-data/latest-data.component";
import { FormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgOrderByPipeModule } from "angular-pipes";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrentStatusComponent,
    LatestDataComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterailModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxChartsModule,
    NgOrderByPipeModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [AppServicesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
