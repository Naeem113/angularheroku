import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface data {
  obj: object;
}

interface latest {
  latest: latest;
  confirmed: number;
  deaths: number;
  recovered: number;
}
@Injectable({
  providedIn: "root"
})
export class AppServicesService {
  date = new Date();
  currentDay = (this.date.getDate() - 1).toString();
  currentMounth = (this.date.getMonth() + 1).toString();

  latestData: latest[] = [];
  csvRecords: data;
  URL: string =
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
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv";

  constructor(private http: HttpClient) {}

  getConfirmedData() {
    return this.http.get(this.ConfirmedCases_URL, { responseType: "text" });
  }

  getDeathsData() {
    return this.http.get(this.DeathsCases_URL, { responseType: "text" });
  }
  getRecoveredData() {
    return this.http.get(this.RecoveredCases_URL, { responseType: "text" });
  }

  getLocData() {
    return this.http.get(this.URL, { responseType: "text" });
  }
}
