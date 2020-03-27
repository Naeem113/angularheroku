import { Component, OnInit } from "@angular/core";
import { Papa } from "ngx-papaparse";
import { AppServicesService } from "src/app/service/app-services.service";
import { latestData } from "../../models/latestDataModel";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-latest-data",
  templateUrl: "./latest-data.component.html",
  styleUrls: ["./latest-data.component.css"]
})
export class LatestDataComponent implements OnInit {
  // *************************************************************************************************************//
  //                                           Variable Declaration                                               *
  // *************************************************************************************************************//

  AllCountry: latestData[] = [];
  loading: boolean = false;
  US: latestData[] = [];
  China: latestData[] = [];
  France: latestData[] = [];
  Australia: latestData[] = [];
  UnitedKingdom: latestData[] = [];
  Canada: latestData[] = [];
  data: latestData[] = [];
  search: string = "";
  page: number = 1;

  // *************************************************************************************************************//
  //                                                Constructor                                                   *
  // *************************************************************************************************************//

  constructor(
    private papa: Papa,
    private _dataService: AppServicesService,
    private spinner: NgxSpinnerService
  ) {}

  // *************************************************************************************************************//
  //                                                 ngOnInit                                                     *
  // *************************************************************************************************************//

  ngOnInit(): void {
    this.spinner.show();
    this.allLocationData();
  }

  // *************************************************************************************************************//
  //                                      Get data when user click on any Row                                     *
  // *************************************************************************************************************//

  getRow(Country) {
    for (let index = 0; index < this.AllCountry.length; index++) {
      const element = this.AllCountry[index];
      if (element.Country_Region === Country.innerText) {
        console.log(element);
      }
    }

    // console.log(this.LoctionData[0].Confirmed);
  }

  // *************************************************************************************************************//
  //                                    Subscribe Location function from service                                  *
  // *************************************************************************************************************//

  allLocationData() {
    if (localStorage.getItem("LocationData")) {
      this.New_arrayData();
      this.loading = true;
      this.spinner.hide();
    } else {
      this._dataService.getLocationData().subscribe(res => {
        this.papa.parse(res, {
          header: true,
          complete: result => {
            localStorage.setItem("LocationData", JSON.stringify(result.data));
            this.New_arrayData();
            setTimeout(() => {
              this.spinner.hide();
              this.loading = true;
            }, 3000);
          }
        });
      });
    }
  }

  // *************************************************************************************************************//
  //                                         Objects for Different Countries                                      *
  // *************************************************************************************************************//

  US_Obj: any = {
    Active: "0",
    Admin2: "Clay",
    Combined_Key: "Clay, Texas, US",
    Confirmed: "",
    Country_Region: "US",
    Deaths: "",
    FIPS: "48077",
    Last_Update: "2020-03-25 23:33:19",
    Lat: "33.78686685",
    Long_: "-98.20771198",
    Province_State: "Texas",
    Recovered: ""
  };
  China_Obj: any = {
    Active: "150",
    Admin2: "",
    Combined_Key: "Beijing, China",
    Confirmed: "",
    Country_Region: "China",
    Deaths: "",
    FIPS: "",
    Last_Update: "2020-03-25 07:35:38",
    Lat: "40.1824",
    Long_: "116.4142",
    Province_State: "Beijing",
    Recovered: ""
  };
  France_Obj: any = {
    Active: "0",
    Admin2: "",
    Combined_Key: "Alberta, Canada",
    Confirmed: "",
    Country_Region: "Canada",
    Deaths: "",
    FIPS: "",
    Last_Update: "2020-03-25 23:37:36",
    Lat: "53.9333",
    Long_: "-116.5765",
    Province_State: "Alberta",
    Recovered: ""
  };
  Australia_Obj: any = {
    Active: "22",
    Admin2: "",
    Combined_Key: "French Guiana, France",
    Confirmed: "",
    Country_Region: "France",
    Deaths: "",
    FIPS: "",
    Last_Update: "2020-03-25 23:33:04",
    Lat: "4.0",
    Long_: "-53.0",
    Province_State: "French Guiana",
    Recovered: ""
  };
  UnitedKingdom_Obj: any = {
    Active: "39",
    Admin2: "",
    Combined_Key: "Australian Capital Territory, Australia",
    Confirmed: "",
    Country_Region: "Australia",
    Deaths: "",
    FIPS: "",
    Last_Update: "2020-03-25 23:37:49",
    Lat: "-35.4735",
    Long_: "149.0124",
    Province_State: "Australian Capital Territory",
    Recovered: ""
  };
  Canada_Obj: any = {
    Active: "7",
    Admin2: "",
    Combined_Key: "Bermuda, United Kingdom",
    Confirmed: "",
    Country_Region: "United Kingdom",
    Deaths: "",
    FIPS: "",
    Last_Update: "2020-03-25 23:33:04",
    Lat: "32.3078",
    Long_: "-64.7505",
    Province_State: "Bermuda",
    Recovered: ""
  };

  // *************************************************************************************************************//
  //                                   Function for Making New Array for Display                                  *
  // *************************************************************************************************************//

  New_arrayData() {
    this.data = JSON.parse(localStorage.getItem("LocationData"));
    for (const iterator of this.data) {
      if (
        iterator.Country_Region != "US" &&
        iterator.Country_Region != "China" &&
        iterator.Country_Region != "Canada" &&
        iterator.Country_Region != "France" &&
        iterator.Country_Region != "Australia" &&
        iterator.Country_Region != "United Kingdom"
      ) {
        this.AllCountry.push(iterator);
      }
    }

    this.SeparateCountries(this.data, this.US, "US");
    this.SeparateCountries(this.data, this.China, "China");
    this.SeparateCountries(this.data, this.Canada, "Canada");
    this.SeparateCountries(this.data, this.France, "France");
    this.SeparateCountries(this.data, this.Australia, "Australia");
    this.SeparateCountries(this.data, this.UnitedKingdom, "United Kingdom");

    this.China_Obj.Confirmed = this.Sum(this.China, "Confirmed").toString();
    this.China_Obj.Recovered = this.Sum(this.China, "Recovered").toString();
    this.China_Obj.Deaths = this.Sum(this.China, "Deaths").toString();

    this.US_Obj.Confirmed = this.Sum(this.US, "Confirmed").toString();
    this.US_Obj.Recovered = this.Sum(this.US, "Recovered").toString();
    this.US_Obj.Deaths = this.Sum(this.US, "Deaths").toString();

    this.France_Obj.Confirmed = this.Sum(this.France, "Confirmed").toString();
    this.France_Obj.Recovered = this.Sum(this.France, "Recovered").toString();
    this.France_Obj.Deaths = this.Sum(this.France, "Deaths").toString();

    this.Canada_Obj.Confirmed = this.Sum(this.Canada, "Confirmed").toString();
    this.Canada_Obj.Recovered = this.Sum(this.Canada, "Recovered").toString();
    this.Canada_Obj.Deaths = this.Sum(this.Canada, "Deaths").toString();

    this.UnitedKingdom_Obj.Confirmed = this.Sum(
      this.UnitedKingdom,
      "Confirmed"
    ).toString();
    this.UnitedKingdom_Obj.Recovered = this.Sum(
      this.UnitedKingdom,
      "Recovered"
    ).toString();
    this.UnitedKingdom_Obj.Deaths = this.Sum(
      this.UnitedKingdom,
      "Deaths"
    ).toString();

    this.Australia_Obj.Confirmed = this.Sum(
      this.Australia,
      "Confirmed"
    ).toString();
    this.Australia_Obj.Recovered = this.Sum(
      this.Australia,
      "Recovered"
    ).toString();
    this.Australia_Obj.Deaths = this.Sum(this.Australia, "Deaths").toString();

    this.AllCountry.push(this.China_Obj);
    this.AllCountry.push(this.US_Obj);
    this.AllCountry.push(this.France_Obj);
    this.AllCountry.push(this.Canada_Obj);
    this.AllCountry.push(this.UnitedKingdom_Obj);
    this.AllCountry.push(this.Australia_Obj);
  }

  // *************************************************************************************************************//
  //                                         Function Separate array Data                                         *
  // *************************************************************************************************************//

  SeparateCountries(data, countryArray, countryName) {
    for (const iterator of data) {
      if (iterator.Country_Region === countryName) {
        countryArray.push(iterator);
      }
    }
  }

  // *************************************************************************************************************//
  //                                    Function for Sum of Country cases                                         *
  // *************************************************************************************************************//

  Sum(data, cases) {
    let sum = 0;
    for (let index = 0; index < data.length; index++) {
      sum += parseInt(data[index][cases]);
    }
    return sum;
  }
}
