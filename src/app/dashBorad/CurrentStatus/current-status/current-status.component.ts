import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { AppServicesService } from "src/app/service/app-services.service";
import { Papa } from "ngx-papaparse";
import { NgxSpinnerService } from "ngx-spinner";

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
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 65);
    this.maxDate.setDate(this.maxDate.getDate() - 1);
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
  yesterDay = new Date(
    new Date().setDate(new Date().getDate() - 2)
  ).toLocaleDateString();
  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }
  // *************************************************************************************************************//
  //                                                 ngOnInit                                                     *
  // *************************************************************************************************************//

  ngOnInit(): void {
    this.spinner.show();
    this.totalConfirmedCases("Confirmed", this.currentDate.slice(0, -2));
    this.totalRecoverdCases("Recovered", this.currentDate.slice(0, -2));
    this.totalDeathsCases("Deaths", this.currentDate.slice(0, -2));
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
      if (this.showDate.charAt(3) === "0") {
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
      this.confirmedCases = this.SumResult(Data, date);
      this.single.push(
        this.setChartData(this.confirmedCases, "Total Confirmed Cases")
      );
    } else {
      this._serviceData.getConfirmedData().subscribe(res => {
        let d = this.papa.parse(res, {
          header: true,
          complete: result => {
            localStorage.setItem(data, JSON.stringify(result.data));
            return result;
          }
        });
        this.confirmedCases = this.SumResult(d.data, date);
        this.single.push(
          this.setChartData(this.confirmedCases, "Total Confirmed Cases")
        );
      });
    }
  }

  // *************************************************************************************************************//
  //                                      Functions Return Total Recovered Cases                                  *
  // *************************************************************************************************************//

  totalRecoverdCases(keyName: string, date: string) {
    if (localStorage.getItem(keyName)) {
      let Data = JSON.parse(localStorage.getItem(keyName));
      this.recoveredCases = this.SumResult(Data, date);
      this.single.push(
        this.setChartData(this.recoveredCases, "Total Recovered Cases")
      );
    } else {
      this._serviceData.getRecoveredData().subscribe(res => {
        let d = this.papa.parse(res, {
          header: true,
          complete: result => {
            localStorage.setItem(keyName, JSON.stringify(result.data));
            return result;
          }
        });
        this.recoveredCases = this.SumResult(d.data, date);
        this.single.push(
          this.setChartData(this.recoveredCases, "Total Recovered Cases")
        );
      });
    }
  }

  // *************************************************************************************************************//
  //                                         Functions Return Total Deaths                                        *
  // *************************************************************************************************************//

  totalDeathsCases(data: string, date: string) {
    if (localStorage.getItem(data)) {
      let Data = JSON.parse(localStorage.getItem(data));
      this.deathsCases = this.SumResult(Data, date);
      this.single.push(this.setChartData(this.deathsCases, "Total Deaths"));
      this.expression = true;
      this.spinner.hide();
    } else {
      this._serviceData.getDeathsData().subscribe(res => {
        let d = this.papa.parse(res, {
          header: true,
          complete: result => {
            localStorage.setItem(data, JSON.stringify(result.data));
            return result;
          }
        });
        this.deathsCases = this.SumResult(d.data, date);
        this.single.push(this.setChartData(this.deathsCases, "Total Deaths"));
        setTimeout(() => {
          this.spinner.hide();
          this.expression = true;
        }, 2000);
      });
    }
  }

  // *************************************************************************************************************//
  //                            Sum the Reqiured Result AND pass to Subscribe Function                            *
  // *************************************************************************************************************//

  SumResult(data, date) {
    let cases: number = 0;
    for (let index = 0; index < data.length - 1; index++) {
      if (data[index][date]) {
        cases += parseInt(data[index][date]);
      } else {
        cases += parseInt(data[index][this.yesterDay.slice(0, -2)]);
      }
    }
    return cases;
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
  view: any[] = [310, 400];

  colorScheme = {
    domain: ["#C7B42C", "#5AA454", "#A10A28"]
  };
  cardColor: string = "E3EFFF";

  onSelect(event) {
    console.log(event);
  }
}
