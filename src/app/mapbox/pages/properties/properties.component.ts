import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Propiedad {
  title: string;
  description: string;
  lngLat: [number, number];
}

interface makerObject {
  id?: number;
  name?: string;
  color: string;
  center: [number, number];
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styles: [`
    .add-btn {
      position: fixed;
      top: 6rem;
      right: 50px; 
    }
    .add-btn:hover {
      background-image: radial-gradient( #616353 0, #2a2a2e 50%, #000009 100%);
    }
    .delete-btn {
      position: fixed;
      background-color: hsl(2, 70%, 48%);
      top: 8.5rem;
      right: 50px; 
    }
    .delete-btn:hover {
      background-color: hsl(6, 49%, 36%);
    }
    .form-container {
      padding: 5px;
      position: fixed;
      top: 8rem;
      right: 6rem;
      background-color: hsl(238, 15%, 78%, 20%);
      box-sizing: border-box;
      z-index: 999;
      border-radius: 5%;
    }
    .col-5 {
      margin: auto;
      margin-bottom: 3px;
    }
    @media only screen and (max-width: 980px ){
      .delete-btn {
        top: initial;
        bottom: 3.5rem;
      }
      .add-btn {
        top: initial;
        bottom: 1rem;
      }
      .form-container {
        background-color: black;
        opacity: 90%
      }
      
    }
  `
  ]
})
export class PropertiesComponent implements OnInit{

  showSelect: boolean = false;

  propertyForm: FormGroup = this.fb.group({
    marker: ['',Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required]
  })

  // markers that brings the location of the property
  markers : makerObject[] = [];

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.readmakersLS();
    this.readPropertiesLS();
  }

  properties: Propiedad[] = [
    {
      title: 'Casa residencial, Canadá',
      description: 'Bella propiedad en Katana, Canadá',
      lngLat: [ -75.92722289474008, 45.280015511264466]
    },
    {
      title: 'Casa de playa, México',
      description: 'Hermosa casa de playa en Acapulco, México',
      lngLat: [ -99.91287720907991, 16.828940930185748]
    },
    {
      title: 'Apartamento, Argentina',
      description: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: [ -58.430166677283445, -34.57150108832866 ]
    },
    {
      title: 'Local comercial, España',
      description: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    },
  ]

  readmakersLS() {
    if (!localStorage.getItem('markers')) {
      return;
    }
    let markersData: makerObject[] = JSON.parse(localStorage.getItem('markers')!)
    for (let i = 0; i < markersData.length; i++) {
      let { color, center } = markersData[i];
      let markerObject = {
        id: i+1,
        name: `Maker - ${i+1}`,
        color,
        center
      }
      this.markers.push(markerObject)
    }
    // console.log(this.markers)
  }

  readPropertiesLS() {
    if (!localStorage.getItem('properties')) {
      return;
    }
    let propertiesLS: Propiedad[] = JSON.parse(localStorage.getItem('properties')!);
    this.properties = this.properties.concat(propertiesLS)
  }

  savePropertiesLS(property:Propiedad) {
    localStorage.setItem('properties', JSON.stringify(property))
  }

  addProperty() {
    this.showSelect? this.showSelect = false : this.showSelect = true;
  }

  deleteProperties() {
    this.properties.splice(4,localStorage.getItem('properties')?.length);
    localStorage.removeItem('properties');
    this.readPropertiesLS()
  }

  save() {
    if (this.propertyForm.invalid) {
      this.propertyForm.markAllAsTouched()
      return;
    }

    const markerCenter = this.markers.filter(markerObject => {
      return markerObject.id === Number(this.propertyForm.value.marker)
    });

    const newProperty = {
      title: this.propertyForm.value.title,
      description: this.propertyForm.value.description,
      lngLat: markerCenter[0].center
    }

    this.properties.push(newProperty)
    this.savePropertiesLS(newProperty)

    // skip form and reset properties
    this.propertyForm.reset();
    this.showSelect = false;  
  }


}
