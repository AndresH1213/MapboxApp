import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Marker {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMapa!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-73.11259494685036, 7.092094664779263]

  // Markers Array
  markers: Marker[] = []

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    })

    this.map.on('zoom', (e)=> {
      this.zoomLevel = this.map.getZoom()
    })

    this.map.on('zoomend', (e)=> {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo( 18 )
      }
    })

    // tracking the map's movement
    this.map.on('move', (e)=> {
      let { lng, lat } = this.map.getCenter()
      this.center = [lng, lat]
    })

    this.readMarkersLS()
  }

  ngOnDestroy(): void {
    this.map.off('zoom', ()=>{});
    this.map.off('zoomend', ()=>{});
    this.map.off('move', ()=>{});
  }

  addMarker() {
    let color = "#xxxxxx".replace(/x/g, y =>(Math.random()*16|0).toString(16));
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: color
    }).setLngLat( this.center )
      .addTo( this.map );
    
    this.markers.push({
      color,
      marker: newMarker,
    });
    this.saveMarkersLS()
  }

  goMarker(marker: mapboxgl.Marker) {
    this.map.flyTo({
      center: marker.getLngLat()
    })
  }

  saveMarkersLS() {
    const markersArray: Marker[] = [];
    this.markers.forEach(m => {
      let color = m.color;
      let { lng, lat} = m.marker!.getLngLat(); 

      markersArray.push({
        color:color,
        center: [lng, lat]
      })
    });
    localStorage.setItem('markers',JSON.stringify(markersArray))
  }

  readMarkersLS() {
    if (!localStorage.getItem('markers')) { return;}
    const markersArr: Marker[] = JSON.parse(localStorage.getItem('markers')!);
    markersArr.forEach(m => {
      let newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat( m.center! )
        .addTo( this.map )

      this.markers.push({
        marker: newMarker,
        color: m.color
      });
      newMarker.on('dragend', () => {
        this.saveMarkersLS()
      })
    });
  }

  deleteMarker(index: number) {
    // Search the reference of the marker with the index in markers[]
    this.markers[index].marker?.remove();
    this.markers.splice(index, 1);

    this.saveMarkersLS()
  }

  zoomIn() {
    this.map.zoomIn();
    this.zoomLevel = this.map.getZoom()
  }

  zoomOut() {
    this.map.zoomOut();
    this.zoomLevel = this.map.getZoom()
  }

  zoomChange(value: string) {
    this.map.zoomTo( Number(value))
    this.zoomLevel = this.map.getZoom()
  }

}
