import { RouterConfig } from '@angular/router';
import { Blog } from './blog';
import { About } from "./about";
import {BlogDetail} from "./blog/blog.detail.component";
import {Manage} from "./manage/manage.component";


export const routes: RouterConfig = [
  { path: 'blog', component: Blog },
  { path: 'blog/:id', component: BlogDetail },
  { path: 'about-mathijs-segers', component: About },
  { path: 'skills-and-history', component: About },
  { path: 'manage', component: Manage },
  { path: '**', redirectTo: 'blog' }
];
