// the polyfills must be the first thing imported in node.js
// import 'angular2-universal/polyfills'; // polyfills are moved to server.ts


// Angular 2 Universal
import {
  REQUEST_URL,
  ORIGIN_URL,
  NODE_LOCATION_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

// Application
import {App} from './app/app.component';
import {routes} from './app/app.routes';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthMethods, AuthProviders } from 'angularfire2';

export function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';

  let config: ExpressEngineConfig = {
    directives: [
      App
    ],
    platformProviders: [
      {provide: ORIGIN_URL, useValue: 'http://localhost:3000'},
      {provide: APP_BASE_HREF, useValue: baseUrl},
    ],
    providers: [
      {provide: REQUEST_URL, useValue: url},
      NODE_HTTP_PROVIDERS,
      provideRouter(routes),
      NODE_LOCATION_PROVIDERS,
      FIREBASE_PROVIDERS,
      // Initialize Firebase app
      defaultFirebase({
        apiKey: "AIzaSyC75MzDIVaPQMX4T0RaJg6N5N5pE938dMA",
        authDomain: "portfolio-c9844.firebaseapp.com",
        databaseURL: "https://portfolio-c9844.firebaseio.com",
        storageBucket: "portfolio-c9844.appspot.com",
      }),
      firebaseAuthConfig({
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }),
    ],
    async: true,
    preboot: false // { appRoot: 'app' } // your top level app component selector
  };

  res.render('index', config);
}
