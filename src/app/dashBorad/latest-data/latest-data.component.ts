import { Component, OnInit } from "@angular/core";
import { Papa } from "ngx-papaparse";
import { AppServicesService } from "src/app/service/app-services.service";
import { latestData } from "../../models/latestDataModel";
import { from } from "rxjs";

@Component({
  selector: "app-latest-data",
  templateUrl: "./latest-data.component.html",
  styleUrls: ["./latest-data.component.css"]
})
export class LatestDataComponent implements OnInit {
  APIdata: latestData[] = [];
  date = new Date();
  currentDate = this.date.toLocaleDateString();
  search: string = "";
  page: number = 1;

  constructor(private papa: Papa, private _dataService: AppServicesService) {}

  ngOnInit(): void {
    this.LatestData();
    this.getStoreData();
  }

  getRow(province, country) {
    console.log(country.innerText, province.innerText);
  }

  LatestData() {
    this._dataService.getLocData().subscribe(res => {
      this.papa.parse(res, {
        header: true,
        complete: result => {
          // this.APIdata = result.data;
          localStorage.setItem(this.currentDate, JSON.stringify(result.data));
        }
      });
    });
  }

  getStoreData() {
    this.APIdata = JSON.parse(localStorage.getItem(this.currentDate));
  }
}
