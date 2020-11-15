import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyCN3wGCO9Fe8Dhi5n-ey84FMbS7MsWUxY4",
      authDomain: "bookshelves-1334d.firebaseapp.com",
      databaseURL: "https://bookshelves-1334d.firebaseio.com",
      projectId: "bookshelves-1334d",
      storageBucket: "bookshelves-1334d.appspot.com",
      messagingSenderId: "541356305914",
      appId: "1:541356305914:web:f8737b068106554f6ec843",
      measurementId: "G-XGSY7CJVHR"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
