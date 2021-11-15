import { Component, OnInit } from '@angular/core';

interface navbarItems {
  route: string;
  name: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [`
    li {
      cursor: pointer;
    }

    nav {
      padding: 10px 15px 10px 15px;
      display: flex;
      justify-content: space-between;
      font-family: 'Verdana', 'sans-seriff';
    }
    
    .routes-container {
      width: 16rem;
    }
    .uil {
      font-size: 16px;
      color: white;
    }

  `]
})
export class NavBarComponent implements OnInit {

  navbarItems: navbarItems[] = [
    {
      route: '/home',
      name: 'Home'
    },
    {
      route: '/maps',
      name: 'Maps'
    },
    {
      route: '/places',
      name: 'Places'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
