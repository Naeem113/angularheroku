import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CurrentStatusComponent } from "./dashBorad/CurrentStatus/current-status/current-status.component";
import { LatestDataComponent } from "./dashBorad/latest-data/latest-data.component";

const routes: Routes = [
  {
    path: "",
    component: CurrentStatusComponent
  },
  {
    path: "countries",
    component: LatestDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
