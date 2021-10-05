import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-xs',
  templateUrl: './map-xs.component.html',
  styles: [`
    div {
      width: 100%;
      height: 150px;
      margin: 0px;
    }
  `
  ]
})
export class MapXsComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [0,0];
  @ViewChild('mapxs') divMap!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat( this.lngLat )
      .addTo( map )
  }

}
