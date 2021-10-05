import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { ChartsModule as Ng2ChartModule } from 'ng2-charts';


import { PopulationComponent } from './population/population.component';
import { ChartRoutingModule } from './charts-routing.module';



@NgModule({
  declarations: [
    PopulationComponent
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    Ng2ChartModule,
    HttpClientModule 
  ]
})
export class ChartsPModule { }
