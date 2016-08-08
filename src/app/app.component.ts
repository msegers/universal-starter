import {Component, Directive, ElementRef, Renderer, ViewEncapsulation} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';

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
  encapsulation: ViewEncapsulation.None,
  template: `
    <header>
      <div class="gravatar">
          <h3 class="my-name">Mathijs Segers</h3>
          <img src="http://1.gravatar.com/avatar/da2e78c90eaeaf04236488dc55c58810?size=480" alt="Mathijs Segers" />
          <span>
            I'm a software developer with experience in fields such as Modern Web Applications and various back-end technologies. 
            I live with my girlfriend and two cats. When not coding I brew and drink beer &amp; play Games.
          </span>
      </div>
      <nav>
        <ul>
          <li>
            <a routerLinkActive="active" [routerLink]="[ '/blog' ]">Home</a>
          </li>
          <li>
            <a routerLinkActive="active" [routerLink]="[ '/about-mathijs-segers' ]">About me</a>
          </li>
          <li>
            <a routerLinkActive="active" [routerLink]="[ '/skills-and-history' ]">Skills &amp; History</a>
          </li>
        </ul>
      </nav>
    </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    <footer>
        <a [routerLink]="[ '/manage' ]">admin login</a>
    </footer>
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
