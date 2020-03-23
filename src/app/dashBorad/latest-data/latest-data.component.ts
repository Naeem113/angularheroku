import { Component, OnInit } from "@angular/core";
import { Papa } from "ngx-papaparse";
import { AppServicesService } from "src/app/service/app-services.service";

@Component({
  selector: "app-latest-data",
  templateUrl: "./latest-data.component.html",
  styleUrls: ["./latest-data.component.css"]
})
export class LatestDataComponent implements OnInit {
  rec = [];
  search: string = "";
  page: number = 1;

  constructor(private papa: Papa, private _dataService: AppServicesService) {}

  ngOnInit(): void {
    this.setLocalStorage();
  }

  abc(index) {
    console.log(index);
    console.log(this.rec[index]);
  }

  setLocalStorage() {
    if (localStorage.getItem("data") === null) {
      this._dataService.getLocData().subscribe(res => {
        this.papa.parse(res, {
          header: true,
          complete: result => {
            localStorage.setItem("data", JSON.stringify(result.data));
            this.rec = JSON.parse(localStorage.getItem("data"));
            console.log("newSet LocalStorage");
          }
        });
      });
    } else {
      this.rec = JSON.parse(localStorage.getItem("data"));
      console.log("OldRead LocalStorage");
    }
  }
}
