import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
interface data {
  obj: object;
}
@Injectable({
  providedIn: "root"
})
export class AppServicesService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<data>(
      "https://coronavirus-tracker-api.herokuapp.com/v2/locations"
    );
  }
}
