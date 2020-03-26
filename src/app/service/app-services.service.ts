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
  currentDay = (this.date.getDate() - 1).toString();
  currentMounth = (this.date.getMonth() + 1).toString();

  // *************************************************************************************************************//
  //                                             Set URLs to Variabes                                             *
  // *************************************************************************************************************//

  AllLocation_URL: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/0" +
    this.currentMounth +
    "-" +
    this.currentDay +
    "-2020.csv";
  ConfirmedCases_URL: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

  DeathsCases_URL: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

  RecoveredCases_URL: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

  // *************************************************************************************************************//
  //                                                Constructor                                                   *
  // *************************************************************************************************************//

  constructor(private http: HttpClient) {}

  // *************************************************************************************************************//
  //                                      Functions that Get Data from API                                        *
  // *************************************************************************************************************//

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
