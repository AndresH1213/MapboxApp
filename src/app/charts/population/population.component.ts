import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { PopulationService } from '../services/population.service';
import { CountryPopulation } from '../interfaces/country-population.interface';

interface countryObject {
  name: string;
  population: number;
}

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styles: [
    `
      .title {
        text-align: center;
        padding: 10px;
      }
      .row {
        width: 100%
      }
      .card {
        margin-top: 5px;
        padding: 2px;
        text-align: center;
      }
      .btn {
        width: 150px;
        align-self: center;
      }

    `,
  ],
})
export class PopulationComponent implements OnInit {
  
  allCountries: string[] = [];
  newCountries: countryObject[] = [];
  globalPopulation: number = 0;
  // Doughnut
  public doughnutChartLabels: Label[] = [
    'Mexico',
    'Japan',
    'United States',
    'China',
    'Colombia'
  ];
  public doughnutChartData: MultiDataSet = [
    [128932753, 126476461, 331002651, 1439323776, 50882891],
    //  [50, 150, 120],
    //  [250, 130, 70],
  ];
  public colors: Color[] = [
    {
      backgroundColor: ['#F6DF85', '#D4B46E', '#EBC085', '#D49A6E', '#F6A080'],
    },
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private ps: PopulationService) {}

  ngOnInit(): void {
    this.ps.getAllCountries().subscribe((data) => {
      this.allCountries = data.body.countries;
    });

    this.ps.getGlobalPopulation().subscribe(value => this.globalPopulation = value.body.world_population)
  }

  randomCountries() {
    // ride off the previous countries
    this.newCountries = [];
    let selectedCountries = [];

    // set the array of random countries
    for (let i = 0; i < this.doughnutChartLabels.length; i++){
      let index = Math.trunc(Math.random()*(this.allCountries.length - 1))
      selectedCountries.push(this.allCountries[index])
    }
    // Retrieve new info via requests
    
    this.ps.getCountriesData(selectedCountries).subscribe( countryData => {
      // replace the values of the chart properties
      for (let i = 0; i < countryData.length; i++) {
        this.doughnutChartLabels.splice(i, 1, countryData[i].body.country_name);
        this.doughnutChartData[0].splice(i, 1, countryData[i].body.population)
      }
    })
  }  
}
