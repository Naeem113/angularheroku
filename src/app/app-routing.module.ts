import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CurrentStatusComponent } from "./dashBorad/CurrentStatus/current-status/current-status.component";
import { LatestDataComponent } from "./dashBorad/latest-data/latest-data.component";
import { GuidelinesComponent } from "./guidelines/guidelines.component";

const routes: Routes = [
  {
    path: "",
    component: CurrentStatusComponent
  },
  {
    path: "countries",
    component: LatestDataComponent
  },
  {
    path: "guidelines",
    component: GuidelinesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
