import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Chart } from "chart.js";

interface latest {
  latest: latest;
  confirmed: number;
  deaths: number;
  recovered: number;
}

interface location {
  locations: locations[];
}

interface locations {
  locations: any;
  coordinates: object;
  country: string;
  country_code: number;
}

@Component({
  selector: "app-current-status",
  templateUrl: "./current-status.component.html",
  styleUrls: ["./current-status.component.css"]
})
export class CurrentStatusComponent implements OnInit {
  constructor(private http: HttpClient) {}

  url: string = "https://coronavirus-tracker-api.herokuapp.com/v2/latest";
  data: latest;
  locData: locations;
  // confirmed: number;
  // deaths: number;
  // recovered: number;
  lineChart = [];

  ngOnInit(): void {
    this.getData();
    this.getlocation();
  }

  getData() {
    return this.http.get<latest>(this.url).subscribe(res => {
      this.data = res.latest;
      // this.confirmed = this.data.confirmed;
      // this.deaths = this.data.deaths;
      // this.recovered = this.data.recovered;
    });
  }

  getlocation() {
    return this.http
      .get("https://coronavirus-tracker-api.herokuapp.com/v2/locations", {
        responseType: "json"
      })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  barChart() {
    return (this.lineChart = new Chart("barChart", {
      type: "pie",
      data: {
        labels: ["Red", "Blue", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [4, 3, 2, 10],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          text: "Bar Chart",
          display: true
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }));
  }
}
