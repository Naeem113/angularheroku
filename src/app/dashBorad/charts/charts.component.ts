import { Component, OnInit } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"]
})
export class ChartsComponent implements OnInit {
  ngOnInit(): void {}

  single: any[] = [
    {
      name: "Germany",
      value: 8940000
    },
    {
      name: "USA",
      value: 5000000
    },
    {
      name: "France",
      value: 7200000
    },
    {
      name: "UK",
      value: 6200000
    }
  ];
  view: any[] = [300, 400];

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };
  cardColor: string = "#232837";

  constructor() {
    Object.assign(this.single);
  }

  onSelect(event) {
    console.log(event);
  }
}
