import { RouterConfig } from '@angular/router';
import { Home } from './home';
import {About} from "./about";


export const routes: RouterConfig = [
  { path: '', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'about-mathijs-segers', component: About },
  { path: 'my-history', component: About },
  { path: '**', redirectTo: 'home' }
];
