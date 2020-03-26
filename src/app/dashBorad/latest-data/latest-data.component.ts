import { Component, OnInit } from "@angular/core";
import { Papa } from "ngx-papaparse";
import { AppServicesService } from "src/app/service/app-services.service";
import { latestData } from "../../models/latestDataModel";

@Component({
  selector: "app-latest-data",
  templateUrl: "./latest-data.component.html",
  styleUrls: ["./latest-data.component.css"]
})
export class LatestDataComponent implements OnInit {
  // *************************************************************************************************************//
  //                                           Variable Declaration                                               *
  // *************************************************************************************************************//

  LoctionData: latestData[] = [];
  date = new Date();
  currentDate = this.date.toLocaleDateString();
  search: string = "";
  page: number = 1;

  // *************************************************************************************************************//
  //                                                Constructor                                                   *
  // *************************************************************************************************************//

  constructor(private papa: Papa, private _dataService: AppServicesService) {}

  // *************************************************************************************************************//
  //                                                 ngOnInit                                                     *
  // *************************************************************************************************************//

  ngOnInit(): void {
    this.allLocationData();
  }

  // *************************************************************************************************************//
  //                                      Get data when user click on any Row                                     *
  // *************************************************************************************************************//

  getRow(province, country) {
    console.log(country.innerText, province.innerText);
  }

  // *************************************************************************************************************//
  //                                    Subscribe Location function from service                                  *
  // *************************************************************************************************************//
  allLocationData() {
    if (localStorage.getItem(this.currentDate)) {
      this.LoctionData = JSON.parse(localStorage.getItem(this.currentDate));
    } else {
      this._dataService.getLocationData().subscribe(res => {
        this.papa.parse(res, {
          header: true,
          complete: result => {
            localStorage.setItem(this.currentDate, JSON.stringify(result.data));
            this.LoctionData = JSON.parse(
              localStorage.getItem(this.currentDate)
            );
          }
        });
      });
    }
  }
}
