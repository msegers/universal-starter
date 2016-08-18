import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {BlogArticle} from './blog-article';

@Component({
  moduleId: __filename,
  selector: 'blog',
  directives: [...ROUTER_DIRECTIVES],
  styleUrls: [
  ],
  templateUrl: 'blog.template.html'
})
export class Blog {

    public blogs:BlogArticle[] = [];

    constructor(private af: AngularFire) {
        console.log(af);
        af.database.list("/blog").subscribe(blogs => {
          console.log("blogs", blogs);
          if (blogs) {
            this.blogs = blogs;
          }
        });
    }
}
