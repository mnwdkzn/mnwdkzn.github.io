import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { RootComponent } from './components/root/root.component';
import { CardsService } from './services/cards.service';

const config = {
  apiKey: "AIzaSyDI2HDPZifrTaZ3vBCHq4OYHC6U2NFNFfg",
  authDomain: "moonwood2-2.firebaseapp.com",
  databaseURL: "https://moonwood2-2.firebaseio.com",
  projectId: "moonwood2-2",
  storageBucket: "moonwood2-2.appspot.com",
  messagingSenderId: "529058761819"
};

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [CardsService],
  bootstrap: [RootComponent]
})
export class AppModule { }
