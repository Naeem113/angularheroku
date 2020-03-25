import { Component, OnInit } from "@angular/core";
import { AppServicesService } from "src/app/service/app-services.service";
import { Papa } from "ngx-papaparse";
// import { strict } from "assert";
// import { log } from "util";

@Component({
  selector: "app-current-status",
  templateUrl: "./current-status.component.html",
  styleUrls: ["./current-status.component.css"]
})
export class CurrentStatusComponent implements OnInit {
  constructor(private papa: Papa, private _serviceData: AppServicesService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 63);
    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }

  // ***********************************  Variable Declaration  *******************************//

  minDate: Date;
  maxDate: Date;
  // confirmedCases: number;
  // recoveredCases: number;
  // deathsCases: number;
  currentDate = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toLocaleDateString();
  dateForRecovered = new Date(
    new Date().setDate(new Date().getDate() - 2)
  ).toLocaleDateString();

  // ****************************************  ngOnInit  ************************************//

  ngOnInit(): void {
    this.getConfirmedCasesDetail();
    this.getDeathsCasesDetail();
    this.getRecoveredCasesDetail();
    // this.confirmedCases = this.Cases("Confrm", this.currentDate.slice(0, -2));
    // this.deathsCases = this.Cases("Deaths", this.currentDate.slice(0, -2));
    // this.recoveredCases = this.RecoveredCases(
    //   "Recovered",
    //   this.dateForRecovered.slice(0, -2)
    // );
  }
  showDate: string;
  DataStats: boolean;
  CurrentStats: boolean = true;

  // ********************************  When User Click on Refresh  *****************************//

  SetCurrentStats() {
    this.DataStats = false;
    this.CurrentStats = true;
    this.single = this.newFunction(
      this.Cases("Confrm", this.currentDate.slice(0, -2)),
      this.Cases("Deaths", this.currentDate.slice(0, -2)),
      this.RecoveredCases("Recovered", this.dateForRecovered.slice(0, -2))
    );
  }

  // ********************************  When User Submit Date  *********************************//

  CheckStats(event) {
    if (event.value === "") {
      alert("please Insert Date");
    } else {
      this.CurrentStats = false;
      this.DataStats = true;
      this.showDate = event.value;
      let sel: string = event.value.slice(1, -2);
      if (this.showDate.charAt(3) === "0")
        sel = sel.substring(0, 2) + sel.substring(3, sel.length);
      this.single = this.newFunction(
        this.Cases("Confrm", sel),
        this.Cases("Deaths", sel),
        this.RecoveredCases("Recovered", sel)
      );
    }
  }

  // *****************************  Functions Get All Data from Service  ****************************//

  getConfirmedCasesDetail() {
    this._serviceData.getConfirmedData().subscribe(res => {
      this.papa.parse(res, {
        header: true,
        complete: result => {
          localStorage.setItem("Confrm", JSON.stringify(result.data));
        }
      });
    });
  }
  getDeathsCasesDetail() {
    this._serviceData.getDeathsData().subscribe(res => {
      this.papa.parse(res, {
        header: true,
        complete: result => {
          localStorage.setItem("Deaths", JSON.stringify(result.data));
        }
      });
    });
  }
  getRecoveredCasesDetail() {
    this._serviceData.getRecoveredData().subscribe(res => {
      this.papa.parse(res, {
        header: true,
        complete: result => {
          localStorage.setItem("Recovered", JSON.stringify(result.data));
        }
      });
    });
  }

  // *************************  Functions Return Total Confrm & Deaths Cases  **************************//

  Cases(data: string, date: string) {
    let CasesData = JSON.parse(localStorage.getItem(data));
    let Cases: number = 0;
    for (let index = 0; index < CasesData.length; index++) {
      Cases += parseInt(CasesData[index][date]);
    }
    return Cases;
  }

  // ***************************  Function Return Total Recovered Cases  ****************************//

  RecoveredCases(data: string, date: string) {
    let cleanArray = [];
    let Cases = 0;

    // *********************************  Get data from localStorage  ********************************//

    let Data = JSON.parse(localStorage.getItem(data));

    // ***************************   Filter array to remove blank spaces  ****************************//

    for (let index = 0; index < Data.length; index++) {
      if (Data[index][date] != "") {
        cleanArray.push(Data[index][date]);
      }
    }

    // *****************************   Filter array store to new Array  *****************************//

    for (let i = 0; i < cleanArray.length - 1; i++) {
      Cases = parseInt(cleanArray[i]) + Cases;
    }

    return Cases;
  }

  // ************************** Function to pass Dashboard Chart *****************************//

  newFunction(value1, value2, value3) {
    return [
      {
        name: "Total Confirmed Cases",
        value: value1
      },
      {
        name: "Total Recoverd",
        value: value2
      },
      {
        name: "Total Deaths",
        value: value3
      }
    ];
  }

  // ************************************   Dashboard Chart Data  *********************************//

  single = [
    {
      name: "Total Confirmed Cases",
      value: this.Cases("Confrm", this.currentDate.slice(0, -2))
    },
    {
      name: "Total Recoverd",
      value: this.RecoveredCases(
        "Recovered",
        this.dateForRecovered.slice(0, -2)
      )
    },
    {
      name: "Total Deaths",
      value: this.Cases("Deaths", this.currentDate.slice(0, -2))
    }
  ];
  view: any[] = [280, 400];

  colorScheme = {
    domain: ["#C7B42C", "#5AA454", "#A10A28"]
  };
  cardColor: string = "E3EFFF";

  onSelect(event) {
    console.log(event);
  }
}
