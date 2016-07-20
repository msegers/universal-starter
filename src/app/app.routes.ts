import { RouterConfig } from '@angular/router';
import { Blog } from './blog';
import { About } from "./about";


export const routes: RouterConfig = [
  { path: '', redirectTo: 'home' },
  { path: 'home', component: Blog },
  { path: 'about-mathijs-segers', component: About },
  { path: 'my-history', component: About },
  { path: '**', redirectTo: 'home' }
];
