import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Papa } from "ngx-papaparse";

interface data {
  Confirmed: number;
  ["Province/State"]: string;
  Deaths: number;
  ["Last Update"]: number;
  Latitude: number;
  Longitude: number;
  ["Country/Region"]: String;
  Recovered: number;
}

@Component({
  selector: "app-latest-data",
  templateUrl: "./latest-data.component.html",
  styleUrls: ["./latest-data.component.css"]
})
export class LatestDataComponent implements OnInit {
  csvRecords: data;
  URL: string =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-20-2020.csv";
  constructor(private http: HttpClient, private papa: Papa) {}

  ngOnInit(): void {
    this.getlocation();
  }

  getlocation() {
    return this.http.get(this.URL, { responseType: "text" }).subscribe(
      res => {
        this.papa.parse(res, {
          header: true,
          complete: result => {
            console.log("Parsed: ", result.data[0]);
            this.csvRecords = result.data;
          }
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
