import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllCountries } from '../interfaces/countries.interface';
import { CountryPopulation } from '../interfaces/country-population.interface';
import { combineLatest, Observable } from 'rxjs';
import { GlobalPopulation } from '../interfaces/global-population.interface';
import {tap} from 'rxjs/operators'

interface HeadersRequest {
  'x-rapidapi-host' : string;
  'x-rapidapi-key': string
}


@Injectable({
  providedIn: 'root',
})
export class PopulationService {

  private baseUrl: string = 'https://world-population.p.rapidapi.com';
  private headers: HeadersRequest = {
    "x-rapidapi-host": 'world-population.p.rapidapi.com',
    "x-rapidapi-key" : "1e7ca63ebemsh4629119f1d4dd17p1501cejsn9ba1ae212670"
  }

  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get<AllCountries>(
      `${this.baseUrl}/allcountriesname`,
      {
        headers: {...this.headers},
      }
    );
  }

  getGlobalPopulation() {
    const url = `${this.baseUrl}/worldpopulation`
    return this.http.get<GlobalPopulation>(url, {
      headers: {...this.headers}
    })
  }

  getPopulations(country: string) {
    const url = `${this.baseUrl}/population`;
    return this.http.get<CountryPopulation>(url,  {
      params: {country_name: country},
      headers: {...this.headers}
    })
  }

  getCountriesData(countries: string[]) {
    const requests: Observable<CountryPopulation>[] = []
    
    countries.forEach((country) => {
      const request = this.getPopulations(country);
      requests.push(request)
    });
    return combineLatest(requests)
  }  
}
