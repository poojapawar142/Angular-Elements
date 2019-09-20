import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {createCustomElement} from '@angular/elements'
import { FrameworkPollComponent } from './framework-poll/framework-poll.component';

const config = {
  apiKey: "AIzaSyDboXzzqLY6oytjjihmcyQstg8BifdO8t4",
  authDomain: "framework-voter-cbc38.firebaseapp.com",
  databaseURL: "https://framework-voter-cbc38.firebaseio.com",
  projectId: "framework-voter-cbc38",
  storageBucket: "",
  messagingSenderId: "634859146428",
  appId: "1:634859146428:web:a039603ffc283cd53694b9"
}

@NgModule({
  declarations: [
    AppComponent,
    FrameworkPollComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [FrameworkPollComponent]
})
export class AppModule { 

  constructor(private injector : Injector){

  }
  ngDoBootstrap(){
    const el = createCustomElement(FrameworkPollComponent , {injector : this.injector}); //takes component and expose it as custom elements.
    customElements.define('framework-poll' , el)
  }
}
