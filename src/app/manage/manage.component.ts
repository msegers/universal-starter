import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Component({
  template:`
<div id="management-console">
    <h1>Management</h1>
    <div *ngIf="session.authLoaded">
        <div *ngIf="session.isAuthorised">
            <button (click)="logout()">Logout</button>
        </div>
        <div *ngIf="!session.isAuthorised">
            <form #loginForm="ngForm">
              <input [(ngModel)]="name" autocomplete="off" type="text" name="email" placeholder="email"><br/>
              <input [(ngModel)]="password" autocomplete="off" type="password" name="password" placeholder="password"><br/>
              <button (click)="login()">login</button>
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

  //blog repository
  public blogs;

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

    af.database.list("/blog").subscribe(blogs => {
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

  public startAuth() {
    //nothing todo we need form input
  }
}