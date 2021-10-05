import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PopulationComponent } from "./population/population.component";

const routes: Routes = [
    {
        path: 'population',
        component: PopulationComponent
    },
    {
        path: '**',
        redirectTo: 'population'
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartRoutingModule { }