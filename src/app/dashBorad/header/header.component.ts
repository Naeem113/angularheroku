import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor() {}
  closeButton: boolean = false;
  OpenButton: boolean = true;
  showNav: boolean = false;
  ngOnInit(): void {}

  toggleClose() {
    this.showNav = false;
    this.OpenButton = true;
    this.closeButton = false;
  }

  toggleOpen() {
    this.showNav = true;
    this.closeButton = true;
    this.OpenButton = false;
  }
}
