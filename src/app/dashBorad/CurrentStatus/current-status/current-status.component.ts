import { Component, OnInit } from "@angular/core";
import { AppServicesService } from "src/app/service/app-services.service";

interface latest {
  // latest: latest;
  confirmed: number;
  deaths: number;
  recovered: number;
}

@Component({
  selector: "app-current-status",
  templateUrl: "./current-status.component.html",
  styleUrls: ["./current-status.component.css"]
})
export class CurrentStatusComponent implements OnInit {
  data: latest;
  single: any[];

  constructor(private _serviceData: AppServicesService) {}

  ngOnInit(): void {
    this.setLocalStorage();
  }
  setLocalStorage() {
    if (localStorage.getItem("LatestData") === null) {
      this._serviceData.getData().subscribe(res => {
        localStorage.setItem("LatestData", JSON.stringify(res.latest));
        this.data = JSON.parse(localStorage.getItem("LatestData"));
        this.single = [
          {
            name: "Total Confirmed Cases",
            value: this.data.confirmed
          },
          {
            name: "Total Recoverd",
            value: this.data.recovered
          },
          {
            name: "Total Deaths",
            value: this.data.deaths
          }
        ];
      });
    } else {
      this.data = JSON.parse(localStorage.getItem("LatestData"));

      this.single = [
        {
          name: "Total Confirmed Cases",
          value: this.data.confirmed
        },
        {
          name: "Total Recoverd",
          value: this.data.recovered
        },
        {
          name: "Total Deaths",
          value: this.data.deaths
        }
      ];
    }
  }
  view: any[] = [280, 400];

  colorScheme = {
    domain: ["#C7B42C", "#5AA454", "#A10A28"]
  };
  cardColor: string = "E3EFFF";

  onSelect(event) {
    console.log(event);
  }
}
