import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Blog} from "../blog/blog.component";
import {BlogArticle} from "../blog/blog-article";

/**
 * TODO: Separate in different modules
 * TODO: Just want something working for now
 */
@Component({
  template:`
<div id="management-console">
    <h1>Management</h1>
    <div *ngIf="session.authLoaded">
        <div *ngIf="session.isAuthorised">
            <div class="actions">
                <button *ngIf="action != 'overview'" (click)="overview()">Overview</button>
                <button *ngIf="action != 'blog_window'" (click)="add_blog()">New Blog</button>
                <button (click)="logout()">Logout</button>
            </div>
            <div *ngIf="action == 'overview'">
              <ul>
                <li *ngFor="let blog of blogs">
                  <a (click)="editBlog(blog)">{{blog.title}}</a>
                </li>
              </ul>
            </div>
            <div *ngIf="action == 'blog_window'" id="blog">
              <form #blogForm="ngForm" (ngSubmit)="persistBlog()">
                <input placeholder="Title" type="text" name="title" [(ngModel)]="blog.title">
                <input placeholder="Date" type="date" name="date" [(ngModel)]="blogDate">
                <textarea class="small" [(ngModel)]="blog.intro" name="intro"></textarea>
                <textarea [(ngModel)]="blog.body" name="body"></textarea>
                <button type="submit">Save</button>
              </form>
            </div>
        </div>
        <div *ngIf="!session.isAuthorised">
            <form #loginForm="ngForm" (ngSubmit)="login()">
              <input [(ngModel)]="name" autocomplete="off" type="text" name="email" placeholder="email"><br/>
              <input [(ngModel)]="password" autocomplete="off" type="password" name="password" placeholder="password"><br/>
              <button type="submit">login</button>
            </form>
        </div>
    </div>

    <div *ngIf="!session.authLoaded">Loading session...</div>
</div>`,
  selector: 'manage'
})
export class Manage {
  //sess info
  public session = {authLoaded: false, isAuthorised: false};

  //login form
  public name;
  public password;

  //current action
  public action = 'overview';

  //blog repository
  public blogs;

  //current edited item
  public blog: BlogArticle;
  public blogDate: string = '';

  constructor(private af: AngularFire) {
    af.auth.subscribe(auth => {
      this.session.authLoaded = true;
      if (auth) {
        this.session.isAuthorised = true;
      } else {
        this.session.isAuthorised = false;
        this.startAuth();
      }
    });

    af.database.list("/blog", {
      query: {
        orderByChild: "date",
        limitToFirst: 50
      }
    }).subscribe(blogs => {
      console.log("blogs", blogs);
      if (blogs) {
        this.blogs = blogs;
      }
    });
  }

  public login() {
    this.af.auth.login({email: this.name, password: this.password}).then(resp => {
      console.info("auth success")
    }).catch(err => { console.log(err); });
  }

  public logout() {
    this.af.auth.logout();
  }

  public add_blog() {
    this.blog = {};
    this.action = "blog_window";
  }

  public editBlog(blog: BlogArticle) {
    this.blog = blog;
    let today = new Date(blog.date);//refactor name
    this.blogDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.action = "blog_window";
  }

  public overview() {
    this.action = "overview";
  }

  public persistBlog() {
    let isNew = !this.blog['$key'];


    console.log("persisting blog");

    this.blog.date = new Date(this.blogDate).getTime(); //to int
    console.log("date", this.blog.date, this.blogDate);
    this.blog.url = this.safeUrl(this.blog.title);
    console.log("thisblog", this.blog);

    if (isNew) {
      this.af.database.list('/blog').push(this.blog);
    } else {
      console.log("updating this is the key", this.blog['$key']);
      let key = this.blog['$key'];
      delete this.blog['$key'];
      this.af.database.list('/blog').update(key, this.blog);
    }
    //clear
    this.blog = null;
    this.blogDate = '';
    this.action = '';
  }
  safeUrl(title: string) {

      var encodedUrl = title.toLowerCase();
      encodedUrl = encodedUrl.split(/\&+/).join("-and-")
      encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");
      encodedUrl = encodedUrl.split(/-+/).join("-");
      return encodedUrl;
  }
  public startAuth() {
    //nothing todo we need form input
  }
}
