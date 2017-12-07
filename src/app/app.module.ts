import { OpenGroupPage } from './../pages/open-group/open-group';
import { CreateGroupPage } from './../pages/create-group/create-group';
import { GroupsPage } from './../pages/groups/groups';
import { AboutPage } from './../pages/about/about';
import { RegisterPage } from './../pages/register/register';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_AUTH_CONFIG } from './app.firebase.config';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { storage } from 'firebase/app';
import { GroupPage } from '../pages/group/group';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    HomePage,
    GroupPage,
    GroupsPage,
    OpenGroupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_AUTH_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    HomePage,
    GroupPage,
    GroupsPage,
    OpenGroupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TextToSpeech,
    SpeechRecognition
  ]
})
export class AppModule {}
