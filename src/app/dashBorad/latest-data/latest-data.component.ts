import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import { Papa } from "ngx-papaparse";
import { AppServicesService } from "src/app/service/app-services.service";
import { latestData } from "../../models/latestDataModel";
import { NgxSpinnerService } from "ngx-spinner";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_data_countries2 from "@amcharts/amcharts4-geodata/data/countries2";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_frozen);
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: "app-latest-data",
  templateUrl: "./latest-data.component.html",
  styleUrls: ["./latest-data.component.css"]
})
export class LatestDataComponent implements OnInit, OnDestroy {
  // *************************************************************************************************************//
  //                                           Variable Declaration                                               *
  // *************************************************************************************************************//
  chart: am4maps.MapChart;
  AllCountry: latestData[] = [];
  loading: boolean = false;
  US: latestData[] = [];
  Russia: latestData[] = [];
  China: latestData[] = [];
  Afghanistan: latestData[] = [];
  Iran: latestData[] = [];
  Iraq: latestData[] = [];
  France: latestData[] = [];
  Australia: latestData[] = [];
  UnitedKingdom: latestData[] = [];
  Canada: latestData[] = [];
  data: latestData[] = [];
  search: string = "";

  mapLoad: boolean;

  // *************************************************************************************************************//
  //                                                Constructor                                                   *
  // *************************************************************************************************************//

  constructor(
    private papa: Papa,
    private _dataService: AppServicesService,
    private spinner: NgxSpinnerService,
    private zone: NgZone
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.spinner.show();
      this.worldMap();
      this.spinner.hide();
    }, 3000);
  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

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
    // this.spinner.show();
    if (localStorage.getItem("LocationData")) {
      this.New_arrayData();
      this.loading = true;
    } else {
      this._dataService.getLocationData().subscribe(res => {
        this.papa.parse(res, {
          header: true,
          complete: result => {
            localStorage.setItem("LocationData", JSON.stringify(result.data));
            this.New_arrayData();
            this.loading = true;

            // setTimeout(() => {
            // }, 3000);
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
  RU_Obj: any = {
    code: "RU",
    Active: "0",
    Admin2: "Clay",
    Combined_Key: "Clay, Texas, US",
    Confirmed: "",
    Country_Region: "Russia",
    Deaths: "",
    FIPS: "",
    Last_Update: "2020-03-25 23:33:19",
    Lat: "33.78686685",
    Long_: "-98.20771198",
    Province_State: "Texas",
    Recovered: ""
  };
  AF_Obj: any = {
    code: "AF",
    Active: "0",
    Admin2: "",
    Combined_Key: "",
    Confirmed: "",
    Country_Region: "Afghanistan",
    Deaths: "",
    FIPS: "",
    Last_Update: "2020-03-25 23:33:19",
    Lat: "33.78686685",
    Long_: "-98.20771198",
    Province_State: "",
    Recovered: ""
  };
  IR_Obj: any = {
    code: "IR",
    Active: "0",
    Admin2: "",
    Combined_Key: "",
    Confirmed: "",
    Country_Region: "Iran",
    Deaths: "",
    FIPS: "",
    Last_Update: "2020-03-25 23:33:19",
    Lat: "33.78686685",
    Long_: "-98.20771198",
    Province_State: "",
    Recovered: ""
  };
  IQ_Obj: any = {
    code: "IQ",
    Active: "0",
    Admin2: "",
    Combined_Key: "",
    Confirmed: "",
    Country_Region: "Iraq",
    Deaths: "",
    FIPS: "",
    Last_Update: "2020-03-25 23:33:19",
    Lat: "33.78686685",
    Long_: "-98.20771198",
    Province_State: "",
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
        iterator.Country_Region != "United Kingdom" &&
        iterator.Country_Region != "Russia" &&
        iterator.Country_Region != "Afghanistan" &&
        iterator.Country_Region != "Iran" &&
        iterator.Country_Region != "Iraq"
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
    this.SeparateCountries(this.data, this.Russia, "Russia");
    this.SeparateCountries(this.data, this.Afghanistan, "Afghanistan");
    this.SeparateCountries(this.data, this.Iran, "Iran");

    this.SeparateCountries(this.data, this.Iraq, "Iraq");

    this.RU_Obj.Confirmed = this.Sum(this.Russia, "Confirmed").toString();
    this.RU_Obj.Recovered = this.Sum(this.Russia, "Recovered").toString();
    this.RU_Obj.Deaths = this.Sum(this.Russia, "Deaths").toString();

    this.AF_Obj.Confirmed = this.Sum(this.Afghanistan, "Confirmed").toString();
    this.AF_Obj.Recovered = this.Sum(this.Afghanistan, "Recovered").toString();
    this.AF_Obj.Deaths = this.Sum(this.Afghanistan, "Deaths").toString();

    this.IR_Obj.Confirmed = this.Sum(this.Iran, "Confirmed").toString();
    this.IR_Obj.Recovered = this.Sum(this.Iran, "Recovered").toString();
    this.IR_Obj.Deaths = this.Sum(this.Iran, "Deaths").toString();

    this.IQ_Obj.Confirmed = this.Sum(this.Iraq, "Confirmed").toString();
    this.IQ_Obj.Recovered = this.Sum(this.Iraq, "Recovered").toString();
    this.IQ_Obj.Deaths = this.Sum(this.Iraq, "Deaths").toString();

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
    this.AllCountry.push(this.RU_Obj);
    this.AllCountry.push(this.AF_Obj);
    this.AllCountry.push(this.IR_Obj);
    this.AllCountry.push(this.IQ_Obj);
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

  // *************************************************************************************************************//
  //                                                 World Map                                                     *
  // *************************************************************************************************************//
  worldMap() {
    this.zone.runOutsideAngular(() => {
      // Create map instance
      let chart = am4core.create("chart", am4maps.MapChart);
      chart.projection = new am4maps.projections.Miller();

      // Create map polygon series for world map
      let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
      worldSeries.useGeodata = true;
      worldSeries.geodata = am4geodata_worldLow;
      worldSeries.exclude = ["AQ"];

      let worldPolygon = worldSeries.mapPolygons.template;

      worldPolygon.tooltipText =
        "[bold font-size: 14px black]{name}[/]\n[black]Confirmed cases:[/] [bold font-size: 13px black]{value}[/]\n[black]Recovered Cases:[/] [bold font-size: 13px black]{Recovered}[/]\n[black]Total Deaths:[/] [bold font-size: 13px black]{Deaths}[/]";
      // worldPolygon.nonScalingStroke = true;

      worldPolygon.strokeOpacity = 0.5;
      worldPolygon.fill = am4core.color("#eee");
      worldPolygon.propertyFields.fill = "color";

      let hs = worldPolygon.states.create("hover");
      hs.properties.fill = am4core.color("blue");

      worldSeries.heatRules.push({
        property: "fill",
        target: worldSeries.mapPolygons.template,
        min: am4core.color("#8AB4F8"),
        max: am4core.color("#174EA6")
      });

      // Set up data for countries

      let data = [];

      for (var id in am4geodata_data_countries2) {
        if (am4geodata_data_countries2.hasOwnProperty(id)) {
          let country = am4geodata_data_countries2[id];

          for (let index = 0; index < this.AllCountry.length; index++) {
            const element = this.AllCountry[index];
            if (
              element.Country_Region === country.country ||
              element.Country_Region === country.continent_code ||
              element.Country_Region === id ||
              element.code === id ||
              element.code === country.continent_code
            ) {
              let obj = {
                id: id,
                // color: chart.colors.getIndex(
                //   continents[country.continent_code]
                // ),
                map: country.maps[0],
                country: country.country
              };
              obj["value"] = element.Confirmed;
              obj["Recovered"] = element.Recovered;
              obj["Deaths"] = element.Deaths;

              data.push(obj);
            }
          }
        }
      }

      worldSeries.data = data;

      // Zoom control
      chart.zoomControl = new am4maps.ZoomControl();

      let homeButton = new am4core.Button();
      homeButton.events.on("hit", function() {
        worldSeries.show();
        // countrySeries.show();
        chart.goHome();
      });

      homeButton.icon = new am4core.Sprite();
      homeButton.padding(7, 5, 7, 5);
      homeButton.width = 30;
      homeButton.icon.path =
        "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
      homeButton.marginBottom = 20;
      homeButton.parent = chart.zoomControl;
      homeButton.insertBefore(chart.zoomControl.plusButton);

      this.chart = chart;
    });
  }
}
