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
  csv: string;
  constructor(private http: HttpClient, private papa: Papa) {}

  ngOnInit(): void {
    this.getlocation();
  }

  getlocation() {
    return this.http
      .get(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-19-2020.csv",
        { responseType: "text" }
      )
      .subscribe(
        res => {
          this.csv = res;
          // console.log(this.csv);
          this.papa.parse(this.csv, {
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
