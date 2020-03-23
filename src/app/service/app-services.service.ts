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

  constructor(private http: HttpClient) {}

  getData(): Observable<latest> {
    return this.http.get<latest>(
      "https://coronavirus-tracker-api.herokuapp.com/v2/latest"
    );
  }

  getLocData() {
    return this.http.get(this.URL, { responseType: "text" });
  }
}
