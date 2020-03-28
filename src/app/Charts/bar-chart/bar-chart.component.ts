import { Component, OnInit, Input } from "@angular/core";
import { CurrentStatusComponent } from "src/app/dashBorad/CurrentStatus/current-status/current-status.component";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
  @Input() confirmedCases: number;
  @Input() recoveredCases: number;
  @Input() deathsCases: number;
  constructor(private CurrentSata: CurrentStatusComponent) {}

  ngOnInit(): void {}

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
  public barChartData: any[] = [
    { data: [this.CurrentSata.confirmedCases, 700000], label: "Confirmed" },
    { data: [this.CurrentSata.recoveredCases], label: "Recovered" },
    { data: [this.CurrentSata.deathsCases], label: "Deaths" }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
