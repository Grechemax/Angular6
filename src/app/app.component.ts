import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from "rxjs/Rx";
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
   firebase.initializeApp({
     apiKey: "AIzaSyDdcQguPFpNjal2Uk0AOKc7uf4PDJvYU_M",
     authDomain: "recipe-book-3f457.firebaseapp.com",
   });




 //   const myObservable = Observable.create((observer: Observer<string>) => {
 //     setTimeout(() => {
 //       observer.next('first package');
 //     }, 2000);
 //     setTimeout(() => {
 //       observer.next('second package');
 //     }, 4000);
 //     setTimeout(() => {
 //       observer.error('error in observer');
 //     }, 5000);
 //   });
 //   myObservable.subscribe(
 //     (data: string) => { console.log(data) },
 //     (error: string) => { console.log(error) },
 //     () => { console.log('merely completed') },
 //   );
 }
}
