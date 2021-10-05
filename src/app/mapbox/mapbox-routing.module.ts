import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MapComponent } from './pages/map/map.component';
import { PropertiesComponent } from "./pages/properties/properties.component";

const routes: Routes = [
    {
        path: '',
        component: MapComponent
    },
    {
        path: 'properties',
        component: PropertiesComponent
    },
    {
        path: "**",
        redirectTo: ''
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapboxRoutingModule { }