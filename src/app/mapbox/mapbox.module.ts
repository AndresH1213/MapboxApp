import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MapboxRoutingModule } from './mapbox-routing.module';

import { MapComponent } from './pages/map/map.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { MapXsComponent } from './components/map-xs/map-xs.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';



@NgModule({
  declarations: [
    MapComponent,
    PropertiesComponent,
    MapXsComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    MapboxRoutingModule,
    ReactiveFormsModule
  ]
})
export class MapboxModule { }
