import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppServicesService {
  // *************************************************************************************************************//
  //                                 Set Date for Get Latest Data of Whole Locations                              *
  // *************************************************************************************************************//

  date = new Date();
  currentDay = this.date.getDate() - 1;
  currentMounth = this.date.getMonth().toString();
  lng: number;
  lat: number;
  // *************************************************************************************************************//
  //                                             Set URLs to Variabes                                             *
  // *************************************************************************************************************//

  AllLocation_URL: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-03-2020.csv";

  // AllLocation_URL: string =
  // "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/0" +
  // this.currentMounth +
  // "-" +
  // this.currentDay +
  // "-2020.csv";
  ConfirmedCases_URL: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

  DeathsCases_URL: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

  RecoveredCases_URL: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

  countryName: string = "http://ip-api.com/json";

  // *************************************************************************************************************//
  //                                                Constructor                                                   *
  // *************************************************************************************************************//

  constructor(private http: HttpClient) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  // *************************************************************************************************************//
  //                                      Functions that Get Data from API                                        *
  // *************************************************************************************************************//

  getcountry(): Observable<any> {
    return this.http.get(this.countryName, { responseType: "json" });
  }
  getConfirmedData(): Observable<any> {
    return this.http.get(this.ConfirmedCases_URL, { responseType: "text" });
  }

  getDeathsData(): Observable<any> {
    return this.http.get(this.DeathsCases_URL, { responseType: "text" });
  }
  getRecoveredData(): Observable<any> {
    return this.http.get(this.RecoveredCases_URL, { responseType: "text" });
  }

  getLocationData(): Observable<any> {
    return this.http.get(this.AllLocation_URL, { responseType: "text" });
  }
}
