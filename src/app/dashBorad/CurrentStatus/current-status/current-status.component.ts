import { Component, OnInit } from "@angular/core";
import { AppServicesService } from "src/app/service/app-services.service";
import { Papa } from "ngx-papaparse";
import { NgxSpinnerService } from "ngx-spinner";
import { timer } from "rxjs";

@Component({
  selector: "app-current-status",
  templateUrl: "./current-status.component.html",
  styleUrls: ["./current-status.component.css"]
})
export class CurrentStatusComponent implements OnInit {
  // *************************************************************************************************************//
  //                                                Constructor                                                   *
  // *************************************************************************************************************//

  constructor(
    private papa: Papa,
    private _serviceData: AppServicesService,
    private spinner: NgxSpinnerService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 64);
    this.maxDate.setDate(this.maxDate.getDate());
  }

  // *************************************************************************************************************//
  //                                             Variable Declaration                                             *
  // *************************************************************************************************************//

  expression: boolean = false;

  minDate: Date;
  maxDate: Date;
  showDate: string;
  DataStats: boolean;
  CurrentStats: boolean = true;
  confirmedCases: number;
  recoveredCases: number;
  deathsCases: number;

  currentDate = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toLocaleDateString();
  // dateForRecovered = new Date(
  //   new Date().setDate(new Date().getDate() - 2)
  // ).toLocaleDateString();

  // *************************************************************************************************************//
  //                                                 ngOnInit                                                     *
  // *************************************************************************************************************//

  ngOnInit(): void {
    this.totalConfirmedCases("Confirmed", this.currentDate.slice(0, -2));
    this.totalRecoverdCases("Recovered", this.currentDate.slice(0, -2));
    this.totalDeathsCases("Deaths", this.currentDate.slice(0, -2));
    this.oberserableTimer();
  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, "-");
      // this.subscribeTimer = this.timeLeft - val;
    });
  }

  // *************************************************************************************************************//
  //                                         When User Click on Refresh                                           *
  // *************************************************************************************************************//

  SetCurrentStats() {
    window.location.reload();
  }
  // *************************************************************************************************************//
  //                                         When User Submit Date                                                *
  // *************************************************************************************************************//

  CheckStats(event) {
    if (event.value === "") {
      alert("please Insert Date");
    } else {
      this.CurrentStats = false;
      this.DataStats = true;
      this.showDate = event.value;
      let selectDate: string = event.value.slice(1, -2);
      // let selectDate2: string = event.value.slice(1);

      if (this.showDate.charAt(3) === "0") {
        // selectDate2 =
        //   selectDate2.substring(0, 2) +
        //   selectDate2.substring(3, selectDate2.length);
        selectDate =
          selectDate.substring(0, 2) +
          selectDate.substring(3, selectDate.length);
      }
      this.totalConfirmedCases("Confirmed", selectDate);
      this.totalRecoverdCases("Recovered", selectDate),
        this.totalDeathsCases("Deaths", selectDate);
      this.single = this.userRequiredData(
        this.confirmedCases,
        this.recoveredCases,
        this.deathsCases
      );
    }
  }

  // *************************************************************************************************************//
  //                                      Functions Return Total Confirmed Cases                                   *
  // *************************************************************************************************************//

  totalConfirmedCases(data: string, date: string) {
    if (localStorage.getItem(data)) {
      let Data = JSON.parse(localStorage.getItem(data));
      let cases: number = 0;
      for (let index = 0; index < Data.length - 1; index++) {
        cases += parseInt(Data[index][date]);
      }
      this.confirmedCases = cases;
      this.single.push(this.setChartData(cases, "Total Confirmed Cases"));
    } else {
      this._serviceData.getConfirmedData().subscribe(res => {
        let d = this.papa.parse(res, {
          header: true,
          complete: result => {
            localStorage.setItem(data, JSON.stringify(result.data));
            return result;
          }
        });

        let cases: number = 0;
        for (let index = 0; index < d.data.length - 1; index++) {
          cases += parseInt(d.data[index][date]);
        }

        setTimeout(() => {
          this.confirmedCases = cases;
        }, 2000);

        this.single.push(this.setChartData(cases, "Total Confirmed Cases"));
      });
    }
  }

  // *************************************************************************************************************//
  //                                      Functions Return Total Recovered Cases                                  *
  // *************************************************************************************************************//

  totalRecoverdCases(keyName: string, date: string) {
    if (localStorage.getItem(keyName)) {
      let Data = JSON.parse(localStorage.getItem(keyName));
      let cases: number = 0;
      for (let index = 0; index < Data.length - 1; index++) {
        cases += parseInt(Data[index][date]);
      }
      this.recoveredCases = cases;
      this.single.push(this.setChartData(cases, "Total Recovered Cases"));
    } else {
      this._serviceData.getRecoveredData().subscribe(res => {
        let d = this.papa.parse(res, {
          header: true,
          complete: result => {
            localStorage.setItem(keyName, JSON.stringify(result.data));
            return result;
          }
        });

        let cases: number = 0;
        for (let index = 0; index < d.data.length - 1; index++) {
          cases += parseInt(d.data[index][date]);
        }
        setTimeout(() => {
          this.deathsCases = cases;
        }, 2000);
        this.single.push(this.setChartData(cases, "Total Recovered Cases"));
      });
    }
  }

  // *************************************************************************************************************//
  //                                         Functions Return Total Deaths                                        *
  // *************************************************************************************************************//

  totalDeathsCases(data: string, date: string) {
    if (localStorage.getItem(data)) {
      let Data = JSON.parse(localStorage.getItem(data));
      let cases: number = 0;
      for (let index = 0; index < Data.length - 1; index++) {
        cases += parseInt(Data[index][date]);
      }
      this.deathsCases = cases;
      this.single.push(this.setChartData(cases, "Total Deaths"));
      this.expression = true;
    } else {
      this._serviceData.getDeathsData().subscribe(res => {
        let d = this.papa.parse(res, {
          header: true,
          complete: result => {
            localStorage.setItem(data, JSON.stringify(result.data));
            return result;
          }
        });

        let cases: number = 0;
        for (let index = 0; index < d.data.length - 1; index++) {
          cases += parseInt(d.data[index][date]);
        }

        this.single.push(this.setChartData(cases, "Total Deaths"));

        this.spinner.show();
        setTimeout(() => {
          this.recoveredCases = cases;
          this.spinner.hide();
          this.expression = true;
        }, 3000);
      });
    }
  }

  // *************************************************************************************************************//
  //                                     Function pass values to Dashboard Chart                                  *
  // *************************************************************************************************************//

  setChartData(cases: number, title: string) {
    let obj = {
      name: title,
      value: cases
    };
    return obj;
  }

  // *************************************************************************************************************//
  //                             Function pass values to Dashboard Chart on Date Submit                           *
  // *************************************************************************************************************//
  userRequiredData(confirmedCases, recoveredCases, deathsCasess) {
    return [
      {
        name: "Total Confirmed Cases",
        value: confirmedCases
      },
      {
        name: "Total Recovered Cases",
        value: recoveredCases
      },
      {
        name: "Total Deaths",
        value: deathsCasess
      }
    ];
  }

  // *************************************************************************************************************//
  //                                               Dashboard Chart Data                                            *
  // *************************************************************************************************************//

  single = [];
  view: any[] = [280, 400];

  colorScheme = {
    domain: ["#C7B42C", "#5AA454", "#A10A28"]
  };
  cardColor: string = "E3EFFF";

  onSelect(event) {
    console.log(event);
  }
}
