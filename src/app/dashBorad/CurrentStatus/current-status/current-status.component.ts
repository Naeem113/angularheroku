import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface latest {
  latest: latest;
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
  constructor(private http: HttpClient) {}

  url: string = "https://coronavirus-tracker-api.herokuapp.com/v2/latest";
  data: latest;
  Confirmed: number;
  deaths: number;
  recovered: number;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    return this.http.get<latest>(this.url).subscribe(res => {
      this.data = res.latest;
      this.Confirmed = this.data.confirmed;
      this.deaths = this.data.deaths;
      this.recovered = this.data.recovered;
    });
  }
}
