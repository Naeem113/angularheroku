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
  CurrentStats: boolean = false;
  confirmedCases: number;
  recoveredCases: number;
  deathsCases: number;
  RefreshButton: boolean = false;

  currentDate = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toLocaleDateString();
  yesterDay = new Date(
    new Date().setDate(new Date().getDate() - 2)
  ).toLocaleDateString();
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
  date = new Date();
  lastupdate = this.date.toLocaleDateString();
  // *************************************************************************************************************//
  //                                                 ngOnInit                                                     *
  // *************************************************************************************************************//

  ngOnInit(): void {
    this.spinner.show();
    this.updateLocalStorage();
    if (localStorage.getItem("Deaths")) {
      this.updateLocalStorage();

      this.totalConfirmedCases("Confirmed", this.currentDate.slice(0, -2));
      this.totalRecoverdCases("Recovered", this.currentDate.slice(0, -2));
      this.totalDeathsCases("Deaths", this.currentDate.slice(0, -2));
      this.barChartData.push({
        data: [this.confirmedCases],
        label: "Confirmed"
      });
      this.barChartData.push({
        data: [this.recoveredCases],
        label: "Recovered"
      });
      this.barChartData.push({ data: [this.deathsCases], label: "Deaths" });
      this.expression = true;
      this.spinner.hide();
    } else {
      setTimeout(() => {
        this.totalConfirmedCases("Confirmed", this.currentDate.slice(0, -2));
        this.totalRecoverdCases("Recovered", this.currentDate.slice(0, -2));
        this.totalDeathsCases("Deaths", this.currentDate.slice(0, -2));
        this.barChartData.push({
          data: [this.confirmedCases],
          label: "Confirmed"
        });
        this.barChartData.push({
          data: [this.recoveredCases],
          label: "Recovered"
        });
        this.barChartData.push({ data: [this.deathsCases], label: "Deaths" });
        this.expression = true;
        this.spinner.hide();
      }, 3000);
    }
  }

  onchange(e) {
    console.log(e);
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
      this.barChartData = this.userRequiredBarchartData(
        this.confirmedCases,
        this.recoveredCases,
        this.deathsCases
      );
    }
  }

  // *************************************************************************************************************//
  //                                      Functions Update LocalStorage                                           *
  // *************************************************************************************************************//

  updateLocalStorage() {
    this._serviceData.getConfirmedData().subscribe(res => {
      this.papa.parse(res, {
        header: true,
        complete: result => {
          localStorage.setItem("Confirmed", JSON.stringify(result.data));
          return result;
        }
      });
    });
    this._serviceData.getRecoveredData().subscribe(res => {
      this.papa.parse(res, {
        header: true,
        complete: result => {
          localStorage.setItem("Recovered", JSON.stringify(result.data));
          return result;
        }
      });
    });
    this._serviceData.getDeathsData().subscribe(res => {
      this.papa.parse(res, {
        header: true,
        complete: result => {
          localStorage.setItem("Deaths", JSON.stringify(result.data));
          return result;
        }
      });
    });
  }

  // *************************************************************************************************************//
  //                                      Functions Return Total Confirmed Cases                                   *
  // *************************************************************************************************************//

  totalConfirmedCases(data: string, date: string) {
    let Data = JSON.parse(localStorage.getItem(data));
    this.confirmedCases = this.SumResult(Data, date);
    this.single.push(
      this.setChartData(this.confirmedCases, "Total Confirmed Cases")
    );
  }

  // *************************************************************************************************************//
  //                                      Functions Return Total Recovered Cases                                  *
  // *************************************************************************************************************//

  totalRecoverdCases(keyName: string, date: string) {
    let Data = JSON.parse(localStorage.getItem(keyName));
    this.recoveredCases = this.SumResult(Data, date);
    this.single.push(
      this.setChartData(this.recoveredCases, "Total Recovered Cases")
    );
  }

  // *************************************************************************************************************//
  //                                         Functions Return Total Deaths                                        *
  // *************************************************************************************************************//

  totalDeathsCases(data: string, date: string) {
    let Data = JSON.parse(localStorage.getItem(data));
    this.deathsCases = this.SumResult(Data, date);
    this.single.push(this.setChartData(this.deathsCases, "Total Deaths"));
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
  //                             Function pass values to Bar Chart on Date Submit                           *
  // *************************************************************************************************************//

  userRequiredBarchartData(
    confirmedCases: any,
    recoveredCases: any,
    deathsCasess: any
  ) {
    return [
      { data: [confirmedCases], label: "Confirmed" },
      { data: [recoveredCases], label: "Recovered" },
      { data: [deathsCasess], label: "Deaths" }
    ];
  }

  // *************************************************************************************************************//
  //                                                  Dashboard Chart                                             *
  // *************************************************************************************************************//

  single = [];
  view: any[] = [310, 410];

  colorScheme = {
    domain: ["#C7B42C", "#5AA454", "#A10A28"]
  };
  cardColor: string = "F8F9FA";

  onSelect(event) {
    console.log(event);
  }

  // *************************************************************************************************************//
  //                                                Dashboard Bar Chart                                            *
  // *************************************************************************************************************//

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public mbarChartLabels: string[] = ["Global Cases Chart"];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartColors: Array<any> = [
    {
      backgroundColor: "#C7B42C",
      borderColor: "#C7B42C",
      pointBackgroundColor: "#C7B42C",
      pointBorderColor: "#fbfafa",
      pointHoverBackgroundColor: "#fafafa",
      pointHoverBorderColor: "rgba(105,159,17)"
    },
    {
      backgroundColor: "#5AA454",
      borderColor: "rgba(7,20,96,1)",
      pointBackgroundColor: "rgba(7,20,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(7,0,9,1)"
    },
    {
      backgroundColor: "#A10A28",
      borderColor: "rgba(7,20,96,1)",
      pointBackgroundColor: "rgba(7,20,96,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(7,0,9,1)"
    }
  ];
  public barChartData = [];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
