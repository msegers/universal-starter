import { Component, Directive, ElementRef, Renderer } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';

import { Home } from './home';

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'app', // <app></app>
  directives: [
    ...ROUTER_DIRECTIVES,
  ],
  styleUrls: [
    'app.style.css'
  ],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            <a routerLinkActive="active" [routerLink]="[ '/home' ]">Home</a>
          </li>
          <li>
            <a routerLinkActive="active" [routerLink]="[ '/about-mathijs-segers' ]">About me</a>
          </li>
          <li>
            <a routerLinkActive="active" [routerLink]="[ '/my-history' ]">My History</a>
          </li>
        </ul>
        <div class="nav-footer">
          <div class="logo"></div>        
        </div>
      </nav>
    </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    <footer></footer>
  `
})
export class App {
  title: string = 'ftw';
  data = {};
  server: string;

  constructor(public http: Http) { }

  ngOnInit() {
    // limit the use of setTimeouts
    setTimeout(() => {
      this.server = 'This was rendered from the server!';
    }, 10);

    // use services for http calls
    this.http.get('/data.json')
      .subscribe(res => {
        this.data = res.json();
      });
  }

}
