import { Component } from '@angular/core';

interface sidebarMenu {
  route: string;
  name: string;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
    `
      li {
        cursor: pointer;
        color: whitesmoke;
      }

      ul {
        position: fixed;
        top: 6rem;
        left: 20px;
        z-index: 99;
      }
      .active {
        background-image: radial-gradient(circle at 112.59% 50%, #616353 0, #2a2a2e 50%, #000009 100%);
      }
      @media only screen and (max-width: 980px ){
      
      ul {
        top: initial;
        bottom: 3rem;
      }
      
    }
    `,
  ],
})
export class SideBarComponent {
  sidebarMenu: sidebarMenu[] = [
    {
      route: '/maps',
      name: 'Map',
    },
    {
      route: '/maps/properties',
      name: 'Properties',
    },
  ];

  constructor() {}
}
